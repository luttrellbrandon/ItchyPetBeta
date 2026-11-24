<script lang="ts">
  import '../app.css';
  import '@fontsource/open-sans/400.css';
  import '@fontsource/open-sans/600.css';
  import '@fontsource/open-sans/700.css';
  import '@fontsource/noto-serif/400.css';
  import '@fontsource/noto-serif/400-italic.css';
  import Site_Header from '$lib/components/Site_Header.svelte';
  import Site_Footer from '$lib/components/Site_Footer.svelte';

  // Public Properties:
  let { children } = $props();
</script>

<!-------------------------------HTML---------------------------------------->
<a class="skip-link" href="#main">Skip to main content</a>
<Site_Header />
<main id="main" tabindex="-1">{@render children()}</main>
<Site_Footer />
