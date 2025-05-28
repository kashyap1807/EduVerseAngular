import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit, OnDestroy {
  private roles: string[] = [];
  private destroy$ = new Subject<void>();

  @Input()
  set hasRole(roles: string[]) {
    if (roles) {
      this.roles = Array.isArray(roles) ? roles : [roles];
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    // Subscribe to role changes
    this.loginService.claims$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateView();
      });
  }

  private updateView() {
    this.viewContainer.clear();

    if (this.checkRoles()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkRoles(): boolean {
    if (!this.roles || this.roles.length === 0 || !this.loginService.isLoggedIn) {
      return false;
    }

    return this.loginService.userRoles.some(role => this.roles.includes(role));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 