import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  ToastController,
} from '@ionic/angular/standalone';
import { LoginRequest } from 'src/app/core/models/auth/login-request.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { addIcons } from 'ionicons';
import { fingerPrintOutline, lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonHeader,
    IonTitle,
    IonToolbar,
    // IonLabel,
    CommonModule,
    FormsModule,
    IonInput,
    IonInputPasswordToggle,
    IonButton,
    ReactiveFormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonRow,
    IonCol,
    IonGrid,
  ],
})
export class LoginPage implements OnInit {
  loginReq: LoginRequest = {
    identity: '',
    password: '',
  };

  constructor(
    private authService: AuthService,
    private toastController: ToastController,
  ) {
    addIcons({ fingerPrintOutline, lockClosed });
  }

  loginForm = new FormGroup({
    identity: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  ngOnInit() {}

  async onLogin() {
    const { identity, password } = this.loginForm.value;

    if (!identity || !password) return;

    await this.authService.login(identity, password);
  }

  getErrorMessage(campo: string): string {
    const control = this.loginForm.get(campo);
    if (control?.errors) {
      if (control.errors['required']) {
        return 'El campo es requerido';
      }
      if (control.errors['minlength']) {
        return `El campo debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
    }
    return '';
  }
}
