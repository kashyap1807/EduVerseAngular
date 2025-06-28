import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
  ProtectedResourceScopes,
} from '@azure/msal-angular';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { HttpRequestInterceptor } from './services/interceptor/spinner-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { environment } from '../environments/environment';
import { SafePipe } from './pipes/safe.pipe';
import { GlobalErrorInterceptor } from './components/core/error-handling/global-error-handling.interceptor';
import { GlobalErrorHandler } from './components/core/error-handling/global-error-handling.service';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ModalModule } from 'ngx-bootstrap/modal';

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_susi',
    resetPassword: 'B2C_1_password_reset',
    editProfile: 'B2C_1_profile_update',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://eduversebykashyap.b2clogin.com/eduversebykashyap.onmicrosoft.com/B2C_1_susi',
    },
    resetPassword: {
      authority:
        'https://eduversebykashyap.b2clogin.com/eduversebykashyap.onmicrosoft.com/B2C_1_password_reset',
    },
    editProfile: {
      authority:
        'https://eduversebykashyap.b2clogin.com/eduversebykashyap.onmicrosoft.com/B2C_1_profile_update',
    },
  },
  authorityDomain: 'eduversebykashyap.b2clogin.com',
};

function loggerCallback(logLevel: LogLevel, message: string): void {
  console.log(`[MSAL] ${logLevel}: ${message}`);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adb2cConfig.clientId,
      authority: b2cPolicies.authorities.signUpSignIn.authority, //environment.msalConfig.auth.authority,
      knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      // allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<
    string,
    //Array<string>
    Array<string | ProtectedResourceScopes> | null
  >();
  //have this set if more microservice used or requires different scope for different controllers
  // protectedResourceMap.set(
  //   environment.adb2cConfig.apiEndpointUrl, // This is for all controllers
  //   environment.adb2cConfig.scopeUrls
  // );

  protectedResourceMap.set(environment.adb2cConfig.apiEndpointUrl, [
    // {
    //   httpMethod: 'GET',
    //   scopes: [...environment.adb2cConfig.scopeUrls]
    // },
    {
      httpMethod: 'POST',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'PUT',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'DELETE',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    {
      httpMethod: 'PATCH',
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
  ]);

  protectedResourceMap.set(
    `${environment.adb2cConfig.apiEndpointUrl}/videorequest`,
    [
      {
        httpMethod: 'GET',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'POST',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'PUT',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'DELETE',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'PATCH',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
    ]
  );

  protectedResourceMap.set(
    `${environment.adb2cConfig.apiEndpointUrl}/enrollment`,
    [
      {
        httpMethod: 'GET',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'POST',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'PUT',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'DELETE',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
      {
        httpMethod: 'PATCH',
        scopes: [...environment.adb2cConfig.scopeUrls],
      },
    ]
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adb2cConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      CarouselModule.forRoot(),
      AccordionModule.forRoot(),
      RatingModule.forRoot(),
      ModalModule.forRoot(),
      PopoverModule.forRoot(),
      SafePipe,
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }),
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true,
    },
    // provideAnimationsAsync(),
    //provideNoopAnimations(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
