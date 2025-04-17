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
    clientId: '200c783e-b9e7-4c35-a503-7ec49a1700f5',
    readScopeUrl:
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/prod/api/User.Read',
    writeScopeUrl:
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/prod/api/User.Write',
    scopeUrls: [
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/prod/api/User.Write',
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/prod/api/User.Write',
    ],
    apiEndpointUrl: 'https://eduversebykashyap-api.azurewebsites.net/api',
  },
  cacheTimeInMinutes: 30,
};
