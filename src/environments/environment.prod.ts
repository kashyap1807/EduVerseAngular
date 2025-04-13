import { EnvironmentConfiguration } from "../app/models/environment-configuration.model";

const serverUrl = 'https://eduversebykashyap.azurewebsites.net/api';

export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
};
