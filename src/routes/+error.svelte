<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head
  ><title>{page.status} | Veterinary Dermatology Center</title></svelte:head
>
<section class="shell section-space">
  <p class="eyebrow">{page.status}</p>
  <h1>{page.error?.message ?? 'Something went wrong'}</h1>
  <p>Let’s help you find your way.</p>
  <a class="btn btn-primary" href="/">Back to home</a>
</section>
