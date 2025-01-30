import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { LoginResponse } from '../models/auth/login-response.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { JwtClaims } from '../models/auth/jwt-claims.model';
import { UserSession } from '../models/user/user-session.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'ACCESS_TOKEN';

  private _currentUser = signal<ApiResponse<LoginResponse> | null>(null);
  public currentUser = computed(() => this._currentUser());

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
  ) {
    this.init();
  }

  private async init() {
    const token = await this.storage.get(this.tokenKey);
    if (token) {
      this.parseTokenClaims(token);
    }
  }

  parseTokenClaims(token: string) {
    try {
      const decoded = jwtDecode<JwtClaims>(token);
      const user: UserSession = {
        id: decoded.sub ?? ''.
        name: decoded.name ?? ''.
      }
    } catch (err) {}
  }
}
function jwtDecode<T>(token: string) {
  throw new Error('Function not implemented.');
}
