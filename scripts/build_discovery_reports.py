"""Summarize archived evidence into reviewable inventories; performs no network calls."""
import collections
import csv
import html
import json
import re
import struct
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'discovery/2026-11-16'
DOCS = ROOT / 'docs'
pages = json.loads((OUT / 'pages.json').read_text(encoding='utf-8'))
assets = json.loads((OUT / 'assets.json').read_text(encoding='utf-8'))

def image_size(path):
    data = path.read_bytes()
    if data.startswith(b'\x89PNG'):
        return struct.unpack('>II', data[16:24])
    if data.startswith(b'\xff\xd8'):
        pos = 2
        while pos + 9 < len(data):
            if data[pos] != 255:
                pos += 1
                continue
            marker = data[pos + 1]
            pos += 2
            if marker in (0xd8, 0xd9): continue
            length = int.from_bytes(data[pos:pos+2], 'big')
            if marker in (0xc0, 0xc1, 0xc2, 0xc3):
                h, w = struct.unpack('>HH', data[pos+3:pos+7])
                return w, h
            if length < 2: break
            pos += length
    return None, None

def assessment(a):
    if 'error' in a: return 'request_failed'
    if not a['bytes']: return 'empty_response'
    expected_media = re.search(r'\.(?:png|jpe?g|gif|svg|webp|woff2?|ttf|pdf|css|js)$', urlsplit(a['url']).path, re.I)
    if expected_media and a['content_type'] == 'text/html': return 'unexpected_html'
    return 'captured'

for a in assets:
    a['assessment'] = assessment(a)
    if a.get('content_type', '').startswith('image/') and a['assessment'] == 'captured':
        a['width'], a['height'] = image_size(ROOT / a['local_path'])

(OUT / 'assets.json').write_text(json.dumps(assets, indent=2, ensure_ascii=False), encoding='utf-8')
with (OUT / 'assets.csv').open('w', newline='', encoding='utf-8-sig') as f:
    fields = ['url','local_path','content_type','bytes','width','height','assessment','sha256','source_pages','error']
    writer = csv.DictWriter(f, fieldnames=fields, extrasaction='ignore')
    writer.writeheader()
    for a in assets:
        writer.writerow({**a, 'source_pages': ' | '.join(a['source_pages'])})

def clean(value):
    return value.replace('|', '\\|').replace('\n', ' ')

lines = ['# Public route inventory', '',
         'Captured November 16, 2026. HTTP success does not establish usable content. '
         'Empty responses and mismatched final URLs are flagged. This inventory is a source map, '
         'not an approved redirect configuration. Global search forms occur on most pages.', '',
         '| Source URL | Title | Evidence status | Archive |', '| --- | --- | --- | --- |']
with (OUT / 'routes.csv').open('w', newline='', encoding='utf-8-sig') as f:
    writer = csv.DictWriter(f, fieldnames=['url','final_url','title','status','archive'])
    writer.writeheader()
    for p in pages:
        status = 'captured' if p['text'] else 'empty response — needs recovery'
        if p['final_url'] != p['url']: status += '; redirects to ' + p['final_url']
        writer.writerow({k: p[k] for k in ['url','final_url','title','archive']} | {'status': status})
        lines.append(f"| [{clean(p['url'])}]({p['url']}) | {clean(p['title'])} | {clean(status)} | [HTML](../{p['archive']}) |")
(DOCS / 'ROUTE-INVENTORY.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

external = collections.defaultdict(set)
for p in pages:
    for link in p['links']:
        u = urlsplit(link['url'])
        if u.scheme in ('http','https') and u.netloc != 'itchypetvet.com':
            external[link['url']].add(p['url'])
(OUT / 'external-links.json').write_text(json.dumps({k:sorted(v) for k,v in sorted(external.items())}, indent=2), encoding='utf-8')

images = [a for a in assets if a.get('content_type','').startswith('image/') and a['assessment']=='captured']
cards = []
for a in images:
    path = Path(a['local_path']).relative_to('discovery/2026-11-16').as_posix()
    title = Path(urlsplit(a['url']).path).name
    cards.append(f'<figure><a href="{html.escape(path)}"><img loading="lazy" src="{html.escape(path)}" alt=""></a>'
                 f'<figcaption>{html.escape(title)}<br>{a["width"]} × {a["height"]} · {a["bytes"]:,} bytes<br>'
                 f'<a href="{html.escape(a["url"])}">Original source</a></figcaption></figure>')
gallery = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Veterinary Dermatology Center — captured assets</title>
<style>body{font:16px system-ui;margin:2rem;color:#031424;background:#eefbfa}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1rem}figure{margin:0;background:white;padding:1rem;border-radius:8px}img{width:100%;height:220px;object-fit:contain}figcaption{overflow-wrap:anywhere;font-size:14px}a{color:#2f7a84}</style>
<h1>Captured image catalog</h1><p>Discovery evidence, November 16, 2026. Downloaded originals; reuse permission is not established by public availability.</p><main>'''+''.join(cards)+'</main></html>'
(OUT / 'asset-gallery.html').write_text(gallery, encoding='utf-8')

summary = {'page_responses':len(pages),'nonempty_pages':sum(bool(p['text']) for p in pages),
           'empty_pages':[p['url'] for p in pages if not p['text']],
           'assets':dict(collections.Counter(a['assessment'] for a in assets)),
           'images':len(images),'pdfs':sum(a.get('content_type')=='application/pdf' and a['assessment']=='captured' for a in assets),
           'downloaded_bytes':sum(a.get('bytes',0) for a in assets)}
(OUT / 'summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')
print(json.dumps(summary,indent=2))
