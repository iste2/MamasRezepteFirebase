import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    RouterLink
  ],
  providers: [MessageService],
  template: `
    <div class="flex align-items-center justify-content-center min-h-screen">
      <p-card class="w-full md:w-6 lg:w-4">
        <ng-template pTemplate="header">
          <h2 class="text-center m-0 p-4">Reset Password</h2>
        </ng-template>

        <form [formGroup]="resetForm" (ngSubmit)="onSubmit()" class="flex flex-column gap-3">
          <div class="flex flex-column gap-2">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              pInputText 
              formControlName="email"
              [ngClass]="{'ng-invalid ng-dirty': resetForm.get('email')?.invalid && resetForm.get('email')?.touched}"
            >
          </div>

          <div class="flex flex-column gap-2">
            <p-button 
              type="submit" 
              label="Reset Password" 
              [disabled]="resetForm.invalid"
            ></p-button>
          </div>

          <div class="flex justify-content-center">
            <a routerLink="/auth/login">Back to Login</a>
          </div>
        </form>
      </p-card>
    </div>

    <p-toast></p-toast>
  `
})
export class ResetPasswordComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);

  resetForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  async onSubmit(): Promise<void> {
    if (this.resetForm.valid) {
      try {
        await this.authService.resetPassword(this.resetForm.value.email!);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Password reset email sent. Please check your inbox.'
        });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error instanceof Error ? error.message : 'Password reset failed'
        });
      }
    }
  }
} 