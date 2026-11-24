<script lang="ts">
  import { clinic, services, doctors } from '$lib/content/site';
</script>

<svelte:head>
  <title
    >Veterinary Dermatology Center | Skin & Ear Care in Central Florida</title
  >
  <meta
    name="description"
    content="Meet the Veterinary Dermatology Center team. Explore specialty skin and ear care, prepare for your first visit, and find our Central Florida locations."
  />
  <meta property="og:title" content="Veterinary Dermatology Center" />
  <meta
    property="og:description"
    content="Specialty skin and ear care for your pet in Central Florida."
  />
</svelte:head>

<!-------------------------------HTML---------------------------------------->
<section class="hero-section">
  <div class="shell hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Veterinary Dermatology Center · Central Florida</p>
      <h1>A little less itch.<br /><em>A lot more comfort.</em></h1>
      <p class="lead">
        Skin and ear concerns deserve a closer look. Get to know a team
        dedicated to your pet’s dermatology care.
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="/appointments/">Request a visit</a><a
          class="btn btn-outline"
          href="#new-patients">Your first visit</a
        >
      </div>
      <p class="hero-note">Altamonte Springs & Rockledge, Florida</p>
    </div>
    <div class="hero-photo">
      <img
        src="/images/team.jpg"
        width="1703"
        height="1092"
        alt="The Veterinary Dermatology Center team outside the practice"
        fetchpriority="high"
      />
      <div class="photo-caption">
        A team that gets to know you—and your pet.
      </div>
    </div>
  </div>
</section>

<div class="shell quick-links" aria-label="Patient resources">
  <a href="/prescription-request-form/"
    ><span class="resource-icon" aria-hidden="true">Rx</span><span
      ><strong>Prescription refills</strong><small
        >View the request preview</small
      ></span
    ></a
  >
  <a href="https://itchypet.covetruspharmacy.com/"
    ><span class="resource-icon" aria-hidden="true">+</span><span
      ><strong>Online pharmacy</strong><small>Visit our pharmacy partner</small
      ></span
    ></a
  >
  <a href="https://itchypetvet.com/new-clients/patient-handouts/"
    ><span class="resource-icon" aria-hidden="true">≡</span><span
      ><strong>Patient handouts</strong><small
        >Helpful information for home</small
      ></span
    ></a
  >
</div>

<section id="care" class="shell section-space">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Focused on feeling better</p>
      <h2>Specialty care, from skin to ears.</h2>
    </div>
    <a class="text-link" href="https://itchypetvet.com/services/"
      >Explore all services on our current site</a
    >
  </div>
  <div class="service-grid">
    {#each services as service}<article class="card service-card">
        <div class="card-body">
          <span class="service-mark" aria-hidden="true">✳</span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <a class="text-link" href={service.href}>Learn more</a>
        </div>
      </article>{/each}
  </div>
</section>

<section id="new-patients" class="welcome-section">
  <div class="shell welcome-grid">
    <div class="welcome-photo">
      <img
        src="/images/building.jpg"
        width="1920"
        height="1440"
        loading="lazy"
        alt="Exterior of the Veterinary Dermatology Center"
      />
    </div>
    <div>
      <p class="eyebrow">New here? You’re welcome here.</p>
      <h2>Let’s make your first visit a little easier.</h2>
      <p>
        Find out what to expect, get familiar with our center, and learn why
        your veterinarian may recommend a veterinary dermatologist.
      </p>
      <div class="welcome-links">
        <a href="https://itchypetvet.com/new-clients/what-to-expect/"
          >What to expect at your visit</a
        ><a href="https://itchypetvet.com/new-clients/take-a-tour/"
          >Take a look around our center</a
        ><a href="https://itchypetvet.com/why-a-veterinary-dermatologist/"
          >Why a veterinary dermatologist?</a
        >
      </div>
    </div>
  </div>
</section>

<section id="team" class="shell section-space">
  <div class="section-heading">
    <div>
      <p class="eyebrow">Meet your dermatologists</p>
      <h2>People who care about your pet.</h2>
    </div>
    <a class="text-link" href="https://itchypetvet.com/about-us/team/"
      >Meet the full team on our current site</a
    >
  </div>
  <div class="doctor-grid">
    {#each doctors as doctor}<article class="doctor-card">
        <img
          src={doctor.image}
          width="600"
          height="650"
          loading="lazy"
          alt={doctor.name}
        />
        <div>
          <p class="eyebrow">{doctor.role}</p>
          <h3>{doctor.name}</h3>
          <a class="text-link" href={doctor.href}>Read biography</a>
        </div>
      </article>{/each}
  </div>
</section>

<section class="promotion-section">
  <div class="shell promotion-grid">
    <div>
      <p class="eyebrow">From our practice</p>
      <h2>New itch relief options.</h2>
      <p>
        Our current practice announcement introduces Numelvi™ and Befrena™. Ask
        our veterinary team about treatment options for your dog.
      </p>
      <a class="btn btn-primary" href={clinic.phoneHref}>Talk with our team</a>
    </div>
    <a
      href="/images/promotion.png"
      aria-label="View the practice’s full itch relief announcement"
      ><img
        src="/images/promotion.png"
        width="1080"
        height="1350"
        loading="lazy"
        alt="Itchy pup? Relief is here. Practice announcement about Numelvi and Befrena."
      /></a
    >
  </div>
</section>

<section id="locations" class="shell section-space">
  <p class="eyebrow">Find your way to us</p>
  <h2>Two locations. One caring team.</h2>
  <div class="location-grid">
    <article class="location-card">
      <span class="badge badge-outline">Main office</span>
      <h3>Altamonte Springs</h3>
      <p>{clinic.address}</p>
      <ul>
        {#each clinic.hours as hours}<li>{hours}</li>{/each}
      </ul>
      <a
        class="text-link"
        href="https://www.google.com/maps/search/?api=1&query=Veterinary+Dermatology+Center+475+Maitland+Avenue"
        >Get directions</a
      >
    </article>
    <article class="location-card">
      <span class="badge badge-outline">Satellite location</span>
      <h3>Rockledge</h3>
      <p>Animal Specialty & Emergency Hospital<br />Rockledge, Florida</p>
      <p>
        Call our main office for available appointment times and location
        details.
      </p>
      <a class="text-link" href={clinic.phoneHref}>{clinic.phone}</a>
    </article>
  </div>
</section>
