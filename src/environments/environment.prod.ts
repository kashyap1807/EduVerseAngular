import { EnvironmentConfiguration } from "../app/models/environment-configuration.model";

const serverUrl = 'https://eduversebykashyap-api.azurewebsites.net/api';

export const environment: EnvironmentConfiguration = {
  env_name: 'prod',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
  adb2cConfig: {
    clientId: "",
    readScopeUrl: "",
    scopeUrls: [],
    writeScopeUrl: "",
    apiEndpointUrl: ""
  },
  cacheTimeInMinutes: 0
};
