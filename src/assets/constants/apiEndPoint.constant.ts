export const AppBaseURL = {
  apiBaseUrl: 'http://localhost:3000',
};

export const apiEndPoints = {
  patients: `${AppBaseURL.apiBaseUrl}/patients`,
  doctors: `${AppBaseURL.apiBaseUrl}/doctors`,
  appointments: `${AppBaseURL.apiBaseUrl}/appointments`,
  departments: `${AppBaseURL.apiBaseUrl}/departments`,
  billing: `${AppBaseURL.apiBaseUrl}/billing`,
};
