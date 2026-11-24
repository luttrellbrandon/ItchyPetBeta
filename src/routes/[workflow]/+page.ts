import { error } from '@sveltejs/kit';

const workflows: Record<string, string> = {
  appointments: 'Request a visit',
  'prescription-request-form': 'Prescription requests',
  'skin-allergy-testing-questionnaire': 'Skin allergy questionnaire'
};

export function entries() {
  return Object.keys(workflows).map((workflow) => ({ workflow }));
}

export function load({ params }: { params: { workflow: string } }) {
  const title = workflows[params.workflow];
  if (!title) error(404, 'Page not found');
  return { title };
}
