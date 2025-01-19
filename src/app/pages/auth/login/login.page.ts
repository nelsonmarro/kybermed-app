import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
} from '@ionic/angular/standalone';
import { LoginRequest } from 'src/app/core/models/auth/login-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  loginReq: LoginRequest = {
    identity: '',
    password: '',
  };

  constructor() {}

  loginForm = new FormGroup({
    identity: new FormControl(''),
    email: new FormControl(''),
  });

  ngOnInit() {}
}
