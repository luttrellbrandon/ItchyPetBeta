<script lang="ts">
  import { clinic } from '$lib/content/site';
</script>

<!-------------------------------HTML---------------------------------------->
<footer class="site-footer">
  <div class="shell footer-grid">
    <div>
      <p class="footer-title">Veterinary Dermatology Center</p>
      <p>
        Specialty care. A familiar face.<br />Here for your pet’s skin and ear
        health.
      </p>
    </div>
    <div>
      <p class="footer-title">Get in touch</p>
      <a href={clinic.phoneHref}>{clinic.phone}</a><a
        href={`mailto:${clinic.email}`}>{clinic.email}</a
      >
    </div>
    <div>
      <p class="footer-title">Stay connected</p>
      <a href="https://www.facebook.com/itchypetvet">Find us on Facebook</a><a
        href="https://itchypet.covetruspharmacy.com/">Online pharmacy</a
      >
    </div>
  </div>
  <div class="shell footer-bottom">
    © {new Date().getFullYear()} Veterinary Dermatology Center.
  </div>
</footer>
