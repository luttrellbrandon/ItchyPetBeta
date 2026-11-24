export const clinic = {
  name: 'Veterinary Dermatology Center',
  phone: '(407) 986-3376',
  phoneHref: 'tel:+14079863376',
  email: 'info@vetdermcenter.com',
  address: '475 Maitland Avenue, Altamonte Springs, FL 32701',
  hours: [
    'Monday–Thursday: 8:00am–5:30pm',
    'Friday: 8:00am–4:30pm',
    'Saturday–Sunday: Closed'
  ]
};

// These point to homepage sections until their local content routes are migrated.
export const navigation = [
  { label: 'New patients', href: '/#new-patients' },
  { label: 'Our care', href: '/#care' },
  { label: 'Our team', href: '/#team' },
  { label: 'Locations & contact', href: '/#locations' }
];

export const services = [
  {
    title: 'Allergy testing',
    text: 'Learn about testing for environmental allergies.',
    href: 'https://itchypetvet.com/services/allergy-testing/'
  },
  {
    title: 'Food allergy & intolerance',
    text: 'Understand how food can affect your pet’s skin.',
    href: 'https://itchypetvet.com/services/food-allergy-and-intolerance/'
  },
  {
    title: 'Video otoscopy',
    text: 'Explore a closer look at your pet’s ear health.',
    href: 'https://itchypetvet.com/services/video-otoscopy/'
  }
];

export const doctors = [
  {
    name: 'Dr. Caitlin Contreary',
    role: 'Dermatologist',
    image: '/images/caitlin.jpg',
    href: 'https://itchypetvet.com/team/dr-caitlin-contreary/'
  },
  {
    name: 'Dr. Katherine Doerr',
    role: 'Dermatologist',
    image: '/images/katherine.jpg',
    href: 'https://itchypetvet.com/team/dr-katherine-doerr/'
  }
];
