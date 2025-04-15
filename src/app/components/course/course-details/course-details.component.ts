import { CourseDetail } from './../../../models/courseDetail.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafePipe } from "../../../pipes/safe.pipe";

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SafePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent implements OnInit {
  courseDetails: CourseDetail | null = null;
  courseId: number = 0;
  videoUrl: string | null = null;

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
  openVideo(videoUrl: string): void {
    const videoId = this.extractVideoId(videoUrl);
    this.videoUrl = `https://www.youtube.com/embed/${videoId}`;
  }

  closeVideo(): void {
    this.videoUrl = null;
  }

  private extractVideoId(url: string): string {
    const regex = /youtube\.com\/watch\?v=([^"&?/]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : '';
  }
}
