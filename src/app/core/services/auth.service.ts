import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../models/auth/api-response.model';
import { LoginResponse } from '../models/auth/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'ACCESS_TOKEN';

  private _currentUser = signal<ApiResponse<LoginResponse> | null>(null);
  public currentUser = computed(() => this._currentUser());

  constructor(private http: HttpClient) {}
}
