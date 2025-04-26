import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = `${environment.apiUrl}/UserProfile`;
  constructor(private httpClient: HttpClient) { }
  
  getUserProfile(userId: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.baseUrl}/${userId}`);
  }

  updateUserProfile(formData: FormData) {
    return this.httpClient.post(`${this.baseUrl}/updateProfile`, formData);
  }

}
