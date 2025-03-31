import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = `${environment.apiUrl}/Course`;
  constructor(private http: HttpClient) { }
  
  getAllCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.baseUrl}`);
  }

  getCourseDetails(courseId: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/Details/${courseId}`);
  }

  getCourseByCategoryId(categoryId: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/Category/${categoryId}`);
  }
}
