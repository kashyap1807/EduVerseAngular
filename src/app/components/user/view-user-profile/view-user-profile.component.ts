import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Subject, takeUntil } from 'rxjs';
import { Claim } from '../../../models/claim.model';
import { UserProfileService } from '../../../services/user-profile.service';

@Component({
  selector: 'app-view-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-user-profile.component.html',
  styleUrl: './view-user-profile.component.css',
})
export class ViewUserProfileComponent implements OnInit {
  @Input() userId?: number;
  // @Input() userId = 25;

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

  constructor(private userService: UserProfileService, private loginService: LoginService) {}

  ngOnInit(): void {
    this.userId = this.loginService.userId;
    this.getUserProfile();
  }

  getUserProfile() {
    // Fetch user data, for now using static values for demo
    this.userService.getUserProfile(this.loginService.userId).subscribe({
      next: (data) => {
        this.user = data;
        this.user.bio = this.user.bio?.replace(/\n/g, '<br>');
      },
      error: (err) => {
        console.error('Error fetching user profile', err);
      },
    });
  }
}
