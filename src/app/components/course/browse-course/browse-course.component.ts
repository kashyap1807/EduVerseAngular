import { CommonModule } from '@angular/common';
import { Course } from './../../../models/course.model';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PopoverModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css',
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms ease-out', style({ opacity: 0 }))]),
    ]),
    trigger('bounce', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }), // Start smaller and transparent
        animate(
          '300ms cubic-bezier(0.6, -0.28, 0.735, 0.045)',
          style({ transform: 'scale(1)', opacity: 1 })
        ), // Bounce effect
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ transform: 'scale(0.5)', opacity: 0 })
        ), // Shrink when leaving
      ]),
    ]),
  ],
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  constructor(private courseService: CourseService) {}
  courses: Course[] = [];
  @Input() categoryId: number = 0;
  @Input() browseAllCourse: boolean = false;

  //ngOnInit invoke when the component is initialized
  //ngOnInit is a lifecycle hook that is called after the component has been initialized
  ngOnInit(): void {
    this.processCourse();
  }
  //ngOnChanges invoke when the input property changes
  //ngOnChanges is a lifecycle hook that is called when the input properties of the component change
  ngOnChanges(_changes: SimpleChanges): void {
    this.processCourse();
  }

  processCourse() {
    if (this.browseAllCourse) {
      this.getAllCourses();
    } else {
      this.getCourseByCategory(this.categoryId);
    }
  }
  getCourseByCategory(categoryId: number) {
    this.courseService.getCourseByCategoryId(categoryId).subscribe((data) => {
      this.courses = data;
    });
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }

  getAllCourses() {
    debugger;
    this.courseService.getAllCourses().subscribe((data) => {
      this.courses = data;
    });
  }
}
