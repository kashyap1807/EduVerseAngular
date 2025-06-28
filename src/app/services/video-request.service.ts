import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VideoRequest } from '../models/video-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoRequestService {
  private apiUrl = `${environment.apiUrl}/VideoRequest`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VideoRequest[]> {
    return this.http.get<VideoRequest[]>(this.apiUrl);
  }

  // Get video request by ID
  getById(id: number): Observable<VideoRequest> {
    return this.http.get<VideoRequest>(`${this.apiUrl}/${id}`);
  }

  // Get video requests by User ID
  getByUserId(userId: number): Observable<VideoRequest[]> {    
    return this.http.get<VideoRequest[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new video request
  create(videoRequest: VideoRequest): Observable<VideoRequest> {
    return this.http.post<VideoRequest>(this.apiUrl, videoRequest);
  }

  // Update an existing video request
  update(id: number, videoRequest: VideoRequest): Observable<VideoRequest> {
    return this.http.put<VideoRequest>(`${this.apiUrl}/${id}`, videoRequest);
  }

  // Delete a video request
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
