import { EnvironmentConfiguration } from "../app/models/environment-configuration.model";

const serverUrl = 'https://localhost:7013/api';

export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
};
