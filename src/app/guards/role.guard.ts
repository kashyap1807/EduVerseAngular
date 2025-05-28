import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Array<string>;
    
    if (!this.loginService.isLoggedIn) {
      this.toastr.warning('Please login to access this page');
      this.router.navigate(['/home']);
      return false;
    }

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const hasRequiredRole = this.loginService.userRoles.some(role => 
      requiredRoles.includes(role)
    );

    if (!hasRequiredRole) {
      this.toastr.error('You do not have permission to access this page');
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
} 