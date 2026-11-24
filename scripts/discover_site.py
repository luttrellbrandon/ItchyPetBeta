"""Archive public site evidence and media without submitting forms or executing scripts."""
import collections
import concurrent.futures
import hashlib
import json
import re
import time
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'discovery' / '2026-11-16'
BASE = 'https://itchypetvet.com/'
HOST = urllib.parse.urlsplit(BASE).netloc
OUT.mkdir(parents=True, exist_ok=True)

def normalized(url, origin=BASE):
    return urllib.parse.urldefrag(urllib.parse.urljoin(origin, url))[0]

def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (public website migration inventory)'})
    with urllib.request.urlopen(req, timeout=35) as response:
        return response.read(), response.headers.get_content_type(), response.geturl()

def save(url, data, kind):
    name = Path(urllib.parse.unquote(urllib.parse.urlsplit(url).path)).name or 'index.html'
    name = re.sub(r'[^a-zA-Z0-9._-]', '_', name)
    filename = hashlib.sha256(url.encode()).hexdigest()[:12] + '-' + name
    path = OUT / kind / filename
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    return str(path.relative_to(ROOT)).replace('\\', '/')

class Page(HTMLParser):
    def __init__(self, url):
        super().__init__(convert_charrefs=True)
        self.url = url
        self.links, self.assets, self.forms, self.headings, self.text = [], [], [], [], []
        self.title = ''
        self.tag = ''
        self.skip = 0
        self.form = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tag = tag
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'a' and a.get('href'):
            self.links.append({'url': normalized(a['href'], self.url), 'text': ''})
        if tag == 'form':
            self.form = {'attributes': a, 'fields': []}
            self.forms.append(self.form)
        if tag in ('input', 'select', 'textarea', 'button') and self.form is not None:
            self.form['fields'].append({'tag': tag, **a})
        for key in ('src', 'data-src', 'poster'):
            if a.get(key) and not a[key].startswith('data:'):
                self.assets.append(normalized(a[key], self.url))
        for key in ('srcset', 'data-srcset'):
            for part in a.get(key, '').split(','):
                if part.strip(): self.assets.append(normalized(part.strip().split()[0], self.url))
        if tag == 'link' and a.get('href') and any(x in a.get('rel', '') for x in ('stylesheet', 'icon')):
            self.assets.append(normalized(a['href'], self.url))
        for cssurl in re.findall(r'url\([\'\"]?([^\)\'\"]+)', a.get('style', '')):
            self.assets.append(normalized(cssurl, self.url))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'): self.skip = max(0, self.skip - 1)
        if tag == 'form': self.form = None
        self.tag = ''

    def handle_data(self, data):
        value = ' '.join(data.split())
        if self.tag == 'title': self.title += value
        if value and not self.skip:
            self.text.append(value)
            if self.tag in ('h1', 'h2', 'h3', 'h4'): self.headings.append(value)
            if self.links and self.tag == 'a': self.links[-1]['text'] += value

queue, seen, pages, failures = collections.deque([BASE]), set(), [], []
assets = collections.defaultdict(set)
while queue and len(seen) < 200:
    url = queue.popleft()
    if url in seen: continue
    seen.add(url)
    try:
        data, content_type, final = fetch(url)
        if content_type != 'text/html':
            assets[url].add('linked document')
            continue
        p = Page(final)
        p.feed(data.decode('utf-8', errors='replace'))
        record = {'url': url, 'final_url': final, 'title': p.title, 'headings': p.headings,
                  'links': p.links, 'forms': p.forms, 'text': p.text, 'archive': save(url, data, 'pages')}
        pages.append(record)
        for asset in p.assets: assets[asset].add(url)
        for link in p.links:
            target = urllib.parse.urlsplit(link['url'])
            if target.scheme not in ('http', 'https') or target.netloc != HOST: continue
            if re.search(r'\.(pdf|docx?|xlsx?|png|jpe?g|gif|svg|webp|zip)$', target.path, re.I):
                assets[link['url']].add(url)
            elif not target.query and not re.search(r'/(wp-admin|wp-json|feed|wp-login)', target.path):
                queue.append(link['url'])
        print('PAGE', url, flush=True)
    except Exception as exc: failures.append({'url': url, 'error': str(exc)})

manifest, done = [], set()
for depth in range(3):
    batch = [u for u in assets if u not in done and urllib.parse.urlsplit(u).scheme in ('http', 'https')]
    if not batch: break
    def download(url):
        try:
            data, content_type, final = fetch(url)
            kind = 'styles' if content_type == 'text/css' else 'assets'
            entry = {'url': url, 'final_url': final, 'content_type': content_type,
                     'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest(),
                     'local_path': save(url, data, kind), 'source_pages': sorted(assets[url])}
            refs = []
            if kind == 'styles':
                css = data.decode('utf-8', errors='replace')
                refs = [normalized(x.strip(), final) for x in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css) if not x.startswith('data:')]
            return entry, refs
        except Exception as exc: return {'url': url, 'error': str(exc), 'source_pages': sorted(assets[url])}, []
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        for url, (entry, refs) in zip(batch, pool.map(download, batch)):
            done.add(url)
            manifest.append(entry)
            for ref in refs: assets[ref].add(url)
    print('ASSET BATCH', depth, len(batch), flush=True)

for name, value in [('pages.json', pages), ('assets.json', manifest), ('failures.json', failures)]:
    (OUT / name).write_text(json.dumps(value, indent=2, ensure_ascii=False), encoding='utf-8')
print(json.dumps({'pages': len(pages), 'assets': len(manifest), 'failures': failures}, indent=2))
