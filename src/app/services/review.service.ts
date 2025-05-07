import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = `${environment.apiUrl}/review`;
  constructor(private httpClient: HttpClient) { }
  
  submitReview(review: Review): Observable<Review>{
    return this.httpClient.post<Review>(`${this.baseUrl}`, review);
  }
}
