import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'ACCESS_TOKEN';

  private currentUser = signal();
  constructor() {}
}
