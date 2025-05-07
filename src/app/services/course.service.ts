import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';
import { CourseDetail } from '../models/courseDetail.model';
import { Instructor } from '../models/instructor.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = `${environment.apiUrl}/Course`;
  constructor(private http: HttpClient) { }
  
  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }

  getCourseDetails(courseId: number): Observable<CourseDetail> {
    return this.http.get<CourseDetail>(`${this.baseUrl}/Details/${courseId}`);
  }

  getCourseByCategoryId(categoryId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/Category/${categoryId}`);
  }

  createCourse(course: Course): Observable<any>{
    return this.http.post(`${this.baseUrl}`, course);
  }

  updateCourse(courseId: number, course: Course): Observable<any>{
    return this.http.put(`${this.baseUrl}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${courseId}`);
  }

  getInstructorInfo(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.baseUrl}/Instructors}`);
  }
}
