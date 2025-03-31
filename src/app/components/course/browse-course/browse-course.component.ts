import { CommonModule } from '@angular/common';
import { MOCK_COURSES } from '../../../mock-database/mock-courses';
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

@Component({
  selector: 'app-browse-course',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './browse-course.component.html',
  styleUrl: './browse-course.component.css',
})
export class BrowseCourseComponent implements OnInit, OnChanges {
  courses: Course[] = [];
  @Input() categoryId: number = 0;
  constructor() {
    this.courses = MOCK_COURSES;
  }

  processCourse() {
    this.getCourseByCategory(this.categoryId);
  }
  getCourseByCategory(categoryId: number) {
    this.courses = MOCK_COURSES.filter(
      (course) => course.categoryId == categoryId
    );
  }
  //ngOnInit invoke when the component is initialized
  //ngOnInit is a lifecycle hook that is called after the component has been initialized
  ngOnInit(): void {
    this.processCourse();
  }
  //ngOnChanges invoke when the input property changes
  //ngOnChanges is a lifecycle hook that is called when the input properties of the component change
  ngOnChanges(changes: SimpleChanges): void {
    this.processCourse();
  }

  formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
  }
}
