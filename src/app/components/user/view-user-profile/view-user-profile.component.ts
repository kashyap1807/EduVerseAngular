import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserProfileService } from '../../../services/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './view-user-profile.component.html',
  styleUrl: './view-user-profile.component.css',
})
export class ViewUserProfileComponent implements OnInit {
  @Input() userId = 25;
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

  constructor(private userService:UserProfileService) {}

  ngOnInit(): void {    
    this.getUserProfile();
  }

  getUserProfile() {
    this.userService.getUserProfile(this.userId).subscribe({
      next:(data) => {
        this.user = data;
        this.user.bio = this.user.bio?.replace(/\n/g, '<br>');
      },
      error:(error) => {
        console.error('Error fetching user profile:', error);
      },
    })
  }
}
