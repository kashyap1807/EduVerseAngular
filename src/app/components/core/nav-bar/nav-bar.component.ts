import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalModule, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { LoginService } from '../../../services/login.service';
import { filter, Subject, takeUntil } from 'rxjs';
import { Claim } from '../../../models/claim.model';
import { UserProfileService } from '../../../services/user-profile.service';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, MsalModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
  
export class NavBarComponent implements OnInit, OnDestroy {
  loginDisplay = false;
  isAdmin = false;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();
  claims: Claim[] = [];
  profilePictureUrl = '';
  searchQuery: string = '';
  searchResults: Course[] = [];
  showSearchResults: boolean = false;
  loadingSearch: boolean = false;

@ViewChild('searchBox') searchBox!: ElementRef;

@HostListener('document:click', ['$event.target'])
onClickOutside(targetElement: HTMLElement) {
  if (this.searchBox && !this.searchBox.nativeElement.contains(targetElement)) {
    this.showSearchResults = false;
  }
}
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    public loginService: LoginService,
    private router: Router,
    private userService: UserProfileService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    // Subscribe to claims changes to get user info
    this.loginService.claims$.subscribe((claims) => {
      const roles = claims.filter((f) => f.claim === 'extension_userRoles');
      if (roles.length && !this.isAdmin) {
        this.isAdmin =
          roles[0].value.split(',').filter((f) => f === 'Admin').length > 0;
      }

      // Get profile picture from claims
      const pictureClaim = claims.find((c) => c.claim === 'picture');
      this.profilePictureUrl = pictureClaim?.value || '';

      this.getUserInfo();
    });

    // Handle initial redirect
    this.authService.handleRedirectObservable().subscribe({
      next: (result: AuthenticationResult) => {
        if (result) {
          const redirectStartPage = localStorage.getItem('redirectStartPage');
          if (redirectStartPage) {
            this.router.navigate([redirectStartPage]);
            localStorage.removeItem('redirectStartPage');
          }
        }
      },
      error: (error) => {
        console.error('MSAL Redirect Error: ', error);
      },
    });

    this.isIframe = window !== window.parent && !window.opener;

    // Check if there are any accounts as soon as possible
    this.checkAndSetActiveAccount();
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents();

    // Handle account changes
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        ),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    // Handle auth state changes
    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  private checkAndSetActiveAccount(): void {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      // Set the first account as active if there is no active account
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  getUserInfo() {
    const userId = this.loginService.userId;
    if (userId && userId > 0) {
      this.userService.getUserProfile(userId).subscribe({
        next: (s) => {
          this.profilePictureUrl = s.profilePictureUrl
            ? s.profilePictureUrl
            : '';
        },
        error: (error) => {
          console.error('Error fetching user profile:', error);
        },
      });
    }
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      this.showSearchResults = false;
      return;
    }

    this.loadingSearch = true;
    this.courseService.searchCourses(this.searchQuery).subscribe({
      next: (courses) => {
        this.searchResults = courses;
        this.showSearchResults = true;
        this.loadingSearch = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.loadingSearch = false;
        this.showSearchResults = false;
      },
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
