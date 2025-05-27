import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Subject, takeUntil } from 'rxjs';
import { Claim } from '../../../models/claim.model';

@Component({
  selector: 'app-view-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-user-profile.component.html',
  styleUrl: './view-user-profile.component.css',
})
export class ViewUserProfileComponent implements OnInit, OnDestroy {
  @Input() userId?: number;
  private destroy$ = new Subject<void>();
  claims: Claim[] = [];
  
  user: UserModel = {
    userId: 0,
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    adObjId: '',
    profilePictureUrl: '',
    bio: '',
  };

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to claims changes
    this.loginService.claims$
      .pipe(takeUntil(this.destroy$))
      .subscribe(claims => {
        this.claims = claims;
        this.updateUserFromClaims();
      });
  }

  private updateUserFromClaims() {
    if (this.claims.length > 0) {
      // Map B2C claims to user model
      const findClaimValue = (claimType: string) => 
        this.claims.find(c => c.claim === claimType)?.value || '';

      this.user = {
        userId: +findClaimValue('extension_userId'),
        displayName: findClaimValue('displayName'),
        firstName: findClaimValue('given_name'),
        lastName: findClaimValue('family_name'),
        email: findClaimValue('emails'),
        adObjId: findClaimValue('oid'),
        profilePictureUrl: findClaimValue('picture') || '../../../../assets/images/defavatar.jpg',
        bio: findClaimValue('extension_bio') || 'No bio available'
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
