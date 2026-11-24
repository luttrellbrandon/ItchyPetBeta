<script lang="ts">
  import { clinic } from '$lib/content/site';
  let { data } = $props();
</script>

<svelte:head
  ><title>{data.title} | Veterinary Dermatology Center</title><meta
    name="robots"
    content="noindex"
  /></svelte:head
>
<section class="shell section-space workflow-preview">
  <p class="eyebrow">Patient resources</p>
  <h1>{data.title}</h1>
  <div class="alert alert-info" role="note">
    <p>
      <strong>Preview only.</strong> Online requests are not available on this preview
      website. Nothing is submitted or saved.
    </p>
  </div>
  <p>To arrange care or discuss a prescription, please call our team.</p>
  <a class="btn btn-primary" href={clinic.phoneHref}>Call {clinic.phone}</a><a
    class="text-link"
    href="/">Return to the homepage</a
  >
</section>
