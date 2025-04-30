import { Component, OnInit } from '@angular/core';
import { Enrollment } from '../../../models/enrollment.mode';
import { EnrollmentService } from '../../../services/enrollment.service';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enrollments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.css',
})
export class EnrollmentsComponent implements OnInit {
  enrollments: Enrollment[] = [];
  userId: number = 0;

  constructor(
    private enrollmentService: EnrollmentService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.userId;
    this.enrollmentService
      .getUserEnrollments(this.userId)
      .subscribe((data: Enrollment[]) => {
        this.enrollments = data;
      });
  }

  viewCourseDetails(courseId: number): void {
    this.router.navigate([`/course/details/${courseId}`]);
  }
}
