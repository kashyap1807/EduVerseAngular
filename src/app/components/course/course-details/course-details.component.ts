import { CourseDetail } from './../../../models/courseDetail.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetail | null = null;
  courseId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = Number(params.get('courseId'));
    });
    this.getCourseDetails();  
  }

  getCourseDetails() {
    this.courseService.getCourseDetails(this.courseId).subscribe((data) => {
     this.courseDetails = data;
    });
  }
  
}
