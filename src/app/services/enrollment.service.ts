import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Enrollment } from '../models/enrollment.mode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private baseUrl = `${environment.apiUrl}/enrollment`;
  constructor(private http: HttpClient) {}

  enrollCourse(enrollmentModel: Enrollment): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${this.baseUrl}`, enrollmentModel);
  }

  getEnrollment(id: number): Observable<Enrollment> {
    return this.http.get<Enrollment>(`${this.baseUrl}/${id}`);
  }
  getUserEnrollments(id: number): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${this.baseUrl}/user/${id}`);
  }
}
