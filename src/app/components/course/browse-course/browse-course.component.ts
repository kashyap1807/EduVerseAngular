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

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,PopoverModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css',
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
    debugger
    this.courseService.getAllCourses().subscribe(data => {
      this.courses = data;
    });
  }
}
