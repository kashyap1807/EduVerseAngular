import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { VideoRequest } from '../models/video-request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoRequestService {
  private apiUrl = `${environment.apiUrl}/videorequest`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<VideoRequest[]> {
    return this.http.get<VideoRequest[]>(this.apiUrl);
  }
}
