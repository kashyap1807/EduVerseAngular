import { Review } from './../../../models/review.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent implements OnInit {
  @Input() courseId!: number;
  @Input() userId!: number;
  @Output() reviewSubmitted = new EventEmitter<Review>();
  isLoggedIn = false;

  reviewForm!: FormGroup;
  maxRating: number = 5;
  rating: number = 0; 

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn;
    this.reviewForm = this.fb.group({
      rating: [5, Validators.required],
      comments: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit(): void {
    if (this.reviewForm.valid) {
      const review: Review = {
        reviewId: 0, 
        courseId: this.courseId,
        userId: this.userId,
        userName: '',
        rating: this.reviewForm.value.rating,
        comments: this.reviewForm.value.comments,
        reviewDate: new Date(),
      };

      this.reviewSubmitted.emit(review);
      
      this.reviewForm.reset({
        rating: null,
        comments: '',
      });
    }
  }
}
