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
  selector: 'app-register',
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
          <h2 class="text-center m-0 p-4">Register</h2>
        </ng-template>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              pInputText 
              formControlName="email"
              [ngClass]="{'ng-invalid ng-dirty': registerForm.get('email')?.invalid && registerForm.get('email')?.touched}"
            >
          </div>

          <div class="flex flex-column gap-2">
            <label for="password">Password</label>
            <p-password 
              id="password"
              formControlName="password"
              [toggleMask]="true"
              [feedback]="true"
              [ngClass]="{'ng-invalid ng-dirty': registerForm.get('password')?.invalid && registerForm.get('password')?.touched}"
            ></p-password>
          </div>

          <div class="flex flex-column gap-2">
            <p-button 
              type="submit" 
              label="Register" 
              [disabled]="registerForm.invalid"
            ></p-button>
          </div>

          <div class="flex justify-content-center">
            <a routerLink="/auth/login">Already have an account? Login</a>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit(): Promise<void> {
    if (this.registerForm.valid) {
      try {
        await this.authService.register(this.registerForm.value as AuthCredentials);
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error instanceof Error ? error.message : 'Registration failed'
        });
      }
    }
  }
} 