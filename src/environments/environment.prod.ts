import { EnvironmentConfiguration } from "../app/models/environment-configuration.model";

const serverUrl = 'https://localhost:7013/api';

export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
};
