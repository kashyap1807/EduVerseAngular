import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  MsalService,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  EventMessage,
  AuthenticationResult,
  InteractionStatus,
  EventType,
  InteractionType,
  PopupRequest,
  PromptValue,
  RedirectRequest,
} from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

import { Claim } from '../models/claim.model';
import { createClaimsTable } from '../claim-utils';
import { b2cPolicies } from '../app.config';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private claimsSubject = new BehaviorSubject<Claim[]>([]);
  claims$ = this.claimsSubject.asObservable();
  private userIdSubject = new BehaviorSubject<number>(0);
  userId$ = this.userIdSubject.asObservable();
  loginDisplay = false;
  isLoggedIn = false;
  displayedColumns: string[] = ['claim', 'value', 'description'];
  userName!: string;
  userId!: number;
  userRoles: string[] = [];

  constructor(
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration
  ) {
    // Handle successful login
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        const claims = payload.account.idTokenClaims;
        this.getClaims(claims);
        this.setLoginDisplay();
      });

    // Handle auth state changes
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        const activeAccount = this.authService.instance.getActiveAccount();
        if (activeAccount) {
          const claims = activeAccount.idTokenClaims;
          this.getClaims(claims);
        } else {
          // Try to set active account if there are any accounts
          const accounts = this.authService.instance.getAllAccounts();
          if (accounts.length > 0) {
            this.authService.instance.setActiveAccount(accounts[0]);
            const claims = accounts[0].idTokenClaims;
            this.getClaims(claims);
          } else {
            this.handleInvalidUserId();
          }
        }
      });
  }

  setLoginDisplay() {
    const accounts = this.authService.instance.getAllAccounts();
    this.loginDisplay = accounts.length > 0;
    this.isLoggedIn = this.loginDisplay;
    
    // Ensure we have an active account if there are any accounts
    if (this.loginDisplay && !this.authService.instance.getActiveAccount()) {
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getClaims(claims: any) {
    if (claims) {
      const claimsTable: Claim[] = createClaimsTable(claims);
      
      // First set the claims
      this.claimsSubject.next([...claimsTable]);

      // Handle user roles
      if ('extension_userRoles' in claims && typeof claims.extension_userRoles === 'string') {
        this.userRoles = claims.extension_userRoles.split(',');
      } else {
        this.userRoles = [];
      }

      // Handle user ID and login status
      const userIdClaim = claimsTable.find((f) => f.claim === 'extension_userId');
      if (userIdClaim && userIdClaim.value) {
        const parsedUserId = +userIdClaim.value;
        if (!isNaN(parsedUserId) && parsedUserId > 0) {
          this.userId = parsedUserId;
          this.userIdSubject.next(parsedUserId);
          this.isLoggedIn = true;
        }
      }

      // Handle user name
      const givenName = claimsTable.find((f) => f.claim === 'given_name')?.value || '';
      const familyName = claimsTable.find((f) => f.claim === 'family_name')?.value || '';
      this.userName = givenName && familyName ? `${givenName}, ${familyName}` : '';

      // Additional profile information is available directly in the claims
      // and will be handled by components that need it
    } else {
      this.handleInvalidUserId();
    }
  }

  private handleInvalidUserId() {
    this.userId = 0;
    this.userIdSubject.next(0);
    this.isLoggedIn = false;
    this.claimsSubject.next([]);
    this.userRoles = [];
    this.userName = '';
  }

  isUserInitialized(): boolean {
    return this.isLoggedIn && this.userId > 0 && this.claimsSubject.value.length > 0;
  }

  login(userFlowRequest?: RedirectRequest | PopupRequest) {
    let signUpSignInFlowRequest: RedirectRequest | PopupRequest = {
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      prompt: PromptValue.LOGIN, // force user to reauthenticate with their new password
      scopes: [],
    };

    userFlowRequest = signUpSignInFlowRequest;

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService
          .loginPopup({
            ...this.msalGuardConfig.authRequest,
            ...userFlowRequest,
          } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService
          .loginPopup(userFlowRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({
          ...this.msalGuardConfig.authRequest,
          ...userFlowRequest,
        } as RedirectRequest);
      } else {
        this.authService.loginRedirect(userFlowRequest);
      }
    }
  }

  logout() {
    const activeAccount =
      this.authService.instance.getActiveAccount() ||
      this.authService.instance.getAllAccounts()[0];

    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        account: activeAccount,
      });
    } else {
      this.authService.logoutRedirect({
        account: activeAccount,
      });
    }
  }
}
