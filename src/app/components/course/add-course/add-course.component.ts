import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { CategoryService } from '../../../services/category.service';
import { CourseCategory } from '../../../models/category.model';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  categories: CourseCategory[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(0)]],
      courseType: ['Online', Validators.required],
      seatsAvailable: [null],
      duration: [1, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      instructorId: [1], // This should be dynamic based on logged-in instructor
      startDate: [null],
      endDate: [null],
      thumbnail: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.toastr.error('Failed to load categories');
        console.error('Error loading categories:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.isSubmitting = true;
      const courseData: Course = this.courseForm.value;
      
      this.courseService.createCourse(courseData).subscribe({
        next: () => {
          this.toastr.success('Course created successfully!');
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.toastr.error('Failed to create course');
          console.error('Error creating course:', error);
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly');
    }
  }

  onCourseTypeChange(): void {
    const courseType = this.courseForm.get('courseType')?.value;
    if (courseType === 'Online') {
      this.courseForm.get('seatsAvailable')?.setValue(null);
      this.courseForm.get('startDate')?.setValue(null);
      this.courseForm.get('endDate')?.setValue(null);
    }
  }
} 