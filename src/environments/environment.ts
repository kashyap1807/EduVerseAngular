import { EnvironmentConfiguration } from "../app/models/environment-configuration.model";

const serverUrl = 'https://localhost:7013/api';

export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile: 'user-profiles',
  },
  adb2cConfig: {
    clientId: '332bd77b-2f87-4bd0-a6a4-61ef4fe14822',
    readScopeUrl:
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/dev/api/User.Read',
    writeScopeUrl:
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/dev/api/User.Write',
    scopeUrls: [
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/dev/api/User.Write',
      'https://eduversebykashyap.onmicrosoft.com/eduversebykashyap/dev/api/User.Write',
    ],
    apiEndpointUrl: 'https://localhost:7013/api',
  },
  cacheTimeInMinutes: 30,
};
