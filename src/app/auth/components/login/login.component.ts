import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../interfaces/user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    RouterLink
  ],
  providers: [MessageService],
  template: `
    <div class="flex align-items-center justify-content-center min-h-screen">
      <p-card class="w-full md:w-6 lg:w-4">
        <ng-template pTemplate="header">
          <h2 class="text-center m-0 p-4">Login</h2>
        </ng-template>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              pInputText 
              formControlName="email"
              [ngClass]="{'ng-invalid ng-dirty': loginForm.get('email')?.invalid && loginForm.get('email')?.touched}"
            >
          </div>

          <div class="flex flex-column gap-2">
            <label for="password">Password</label>
            <p-password 
              id="password" 
              formControlName="password"
              [toggleMask]="true"
              [feedback]="false"
              [ngClass]="{'ng-invalid ng-dirty': loginForm.get('password')?.invalid && loginForm.get('password')?.touched}"
            ></p-password>
          </div>

          <div class="flex flex-column gap-2">
            <p-button 
              type="submit" 
              label="Login" 
              [disabled]="loginForm.invalid"
            ></p-button>
          </div>

          <div class="flex justify-content-between">
            <a routerLink="/auth/register">Create account</a>
            <a routerLink="/auth/reset-password">Forgot password?</a>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        await this.authService.login(this.loginForm.value as AuthCredentials);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error instanceof Error ? error.message : 'Login failed'
        });
      }
    }
  }
} 