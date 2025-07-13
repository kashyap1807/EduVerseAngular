import { CourseDetail } from './../../../models/courseDetail.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafePipe } from "../../../pipes/safe.pipe";
import { LoginService } from '../../../services/login.service';
import { EnrollmentService } from '../../../services/enrollment.service';
import { ReviewService } from '../../../services/review.service';
import { UserProfileService } from '../../../services/user-profile.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user.model';
import { CoursePaymentDto, Enrollment } from '../../../models/enrollment.mode';
import { Review } from '../../../models/review.model';
import { RatingComponent, RatingModule } from 'ngx-bootstrap/rating';
import { ReviewFormComponent } from '../review-form/review-form.component';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafePipe, RatingModule,ReviewFormComponent],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetail | null = null;
  courseId: number = 0;
  videoUrl: string | null = null;
  activeSession: Set<number> = new Set<number>();
  isLoggedIn: boolean = false;
  userId = 0;
  instructorInfo!: UserModel;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private loginService: LoginService,
    private enrollmentService: EnrollmentService,
    private reviewService: ReviewService,
    private userService: UserProfileService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.courseDetails = this.route.snapshot.data['courseDetails'];
    this.courseId = this.courseDetails?.courseId || 0;

    if (!this.courseDetails) {
      this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
      this.getCourseDetails();
    }

    this.isLoggedIn = this.loginService.isLoggedIn;
    this.userId = this.loginService.userId;
    // this.route.paramMap.subscribe((params) => {
    //   this.courseId = Number(params.get('courseId'));
    // });
    // this.getCourseDetails();
  }

  openVideo(videoUrl: string): void {
    const videoId = this.extractVideoId(videoUrl);
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  closeVideo(): void {
    this.videoUrl = null;
  }

  toggleSession(sessions: any): void {
    if (this.activeSession.has(sessions.id)) {
      this.activeSession.delete(sessions.id);
    } else {
      this.activeSession.add(sessions.id);
    }
  }

  private extractVideoId(url: string): string {
    const regex = /youtube\.com\/watch\?v=([^"&?/]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  getInstructorInfo(userId: number) {
    this.userService.getUserProfile(userId).subscribe((data) => {
      this.instructorInfo = data;
    });
  }

  getCourseDetails() {
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
      this.courseDetails = data;
      this.getInstructorInfo(data.instructorId);
      this.courseDetails.description = this.courseDetails.description.replace(
        /\n/g,
        '<br>'
      );
      this.courseDetails.sessionDetails.forEach((session) => {
        session.description = session.description.replace(/\n/g, '<br>');
      });
    });

    // this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
    //   this.courseDetails = data;
    // });
  }
  enroll(): void {
    if (!this.isLoggedIn || !this.courseDetails) return;

    const coursePaymentDto: CoursePaymentDto[] = [
      {
        paymentId: 0,
        enrollmentId: 0,
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: 'Credit Card',
        paymentStatus: 'Pending',
      },
    ];

    const enrollmentModel: Enrollment = {
      enrollmentId: 0,
      courseId: this.courseId,
      courseTitle: this.courseDetails.title,
      userId: this.loginService.userId,
      enrollmentDate: new Date(),
      paymentStatus: 'Pending',
      coursePaymentDto: {
        paymentId: 0,
        enrollmentId: 0,
        amount: 0,
        paymentDate: new Date(),
        paymentMethod: 'Credit Card',
        paymentStatus: 'Pending',
      },
    };

    this.enrollmentService.enrollCourse(enrollmentModel).subscribe({
      next: (response) => {
        this.toastr.success('Enrollment successful!');        
      },
      error: (error) => {
        if (error.status === 400) {
          this.toastr.warning('You are already enrolled in this course!');
        } else {
          this.toastr.error('Enrollment failed! Please try again later.');
        }
      },
      complete: () => {},
    });
  }

  onReviewSubmitted(review: Review): void {
    this.reviewService.submitReview(review).subscribe({
      next: (response) => {
        this.toastr.success('Review submitted successfully!');
        this.getCourseDetails();
      },
      error: (error) => {
        this.toastr.warning(
          'Review submission failed! Please try again later.'
        );
      },
      complete: () => {},
    });
  }
}
