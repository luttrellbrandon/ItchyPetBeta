<script lang="ts">
  import { navigation, clinic } from '$lib/content/site';

  // Reactive Variables:
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement;

  // Functions:
  function closeMenu(event: KeyboardEvent) {
    if (event.key === 'Escape' && menuOpen) {
      menuOpen = false;
      menuButton.focus();
    }
  }
</script>

<!-------------------------------HTML---------------------------------------->
<svelte:window onkeydown={closeMenu} />
<div class="contact-strip">
  <div class="shell">
    Specialty skin & ear care for your pet <a href={clinic.phoneHref}
      >Call {clinic.phone}</a
    >
  </div>
</div>
<header class="site-header">
  <div class="shell navbar header-row">
    <a
      href="/"
      aria-label="Veterinary Dermatology Center home"
      onclick={() => (menuOpen = false)}
    >
      <img
        class="logo"
        src="/images/logo.png"
        width="525"
        height="200"
        alt="Veterinary Dermatology Center"
      />
    </a>
    <button
      bind:this={menuButton}
      type="button"
      class="btn btn-ghost menu-toggle"
      aria-expanded={menuOpen}
      aria-controls="primary-navigation"
      onclick={() => (menuOpen = !menuOpen)}
    >
      {menuOpen ? 'Close menu' : 'Menu'}
      <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
    </button>
    <nav
      id="primary-navigation"
      aria-label="Main navigation"
      class:open={menuOpen}
    >
      {#each navigation as item}<a
          href={item.href}
          onclick={() => (menuOpen = false)}>{item.label}</a
        >{/each}
      <a
        class="btn btn-primary"
        href="/appointments/"
        onclick={() => (menuOpen = false)}>Request a visit</a
      >
    </nav>
  </div>
</header>
