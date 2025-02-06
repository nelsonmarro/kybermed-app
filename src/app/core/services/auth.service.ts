import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { ApiResponse } from '../models/api-response.model';
import { LoginResponse } from '../models/auth/login-response.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { JwtClaims } from '../models/auth/jwt-claims.model';
import { UserSession } from '../models/user/user-session.model';
import { jwtDecode } from 'jwt-decode';
import { UserRegister } from '../models/user/user-register.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/v1/auth';
  private tokenKey = 'ACCESS_TOKEN';

  private _currentUser = signal<UserSession | null>(null);
  public currentUser = computed(() => this._currentUser());

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private toastService: ToastService,
  ) {
    this.init();
  }

  private async init() {
    const token = await this.storage.get(this.tokenKey);
    if (token) {
      this.parseTokenClaims(token);
    }
  }

  async register(userRegister: UserRegister) {
    try {
      this.http
        .post(`${this.authUrl}/register`, userRegister)
        .subscribe((result) => {
          console.log(result);
        });
    } catch (err) {
      console.error('Error registering user', err);
    }
  }

  async login(identity: string, password: string) {
    try {
      this.http
        .post<ApiResponse<LoginResponse>>(`${this.authUrl}/login`, {
          identity,
          password,
        })
        .subscribe(async (response) => {
          if (response.status === 'success') {
            this.storage.set(this.tokenKey, response.data.token);
            this.parseTokenClaims(response.data.token);
            // this.router.navigateByUrl('/home');
            await this.toastService.show('top', response.message, 1500);
            console.log(this.currentUser());
          } else if (response.status === 'error') {
            await this.toastService.show('top', response.message, 1500);
          }
        });
    } catch (err) {
      await this.toastService.show(
        'top',
        'Ocurrió un error en el servidor',
        1500,
      );
    }
  }

  private async logout() {
    await this.storage.remove(this.tokenKey);
    this._currentUser.set(null);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  isAuthenticated() {
    return this.currentUser() !== null;
  }

  async getToken() {
    return await this.storage.get(this.tokenKey);
  }

  private parseTokenClaims(token: string) {
    try {
      const decoded = jwtDecode<JwtClaims>(token);
      const user: UserSession = {
        id: decoded.sub ?? '',
        name: decoded.name ?? '',
        email: decoded.email ?? '',
        role: decoded.role ?? '',
      };
      this._currentUser.set(user);
    } catch (err) {
      console.error('Error parsing token', err);
      this._currentUser.set(null);
    }
  }
}
