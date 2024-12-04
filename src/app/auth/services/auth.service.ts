import { Injectable, inject, signal } from '@angular/core';
import { Auth, User, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthCredentials } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.auth.onAuthStateChanged(user => {
      this.currentUser.set(user);
    });
  }

  async login({ email, password }: AuthCredentials): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      await signInWithEmailAndPassword(this.auth, email, password);
      await this.router.navigate(['/recipes']);
    } catch (error) {
      this.error.set('Login failed');
      console.error('Login error:', error);
      throw this.handleError(error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async register({ email, password }: AuthCredentials): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      await this.router.navigate(['/recipes']);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw this.handleError(error);
    }
  }

  private handleError(error: any): Error {
    const errorMessage = error?.message || 'An unknown error occurred';
    return new Error(errorMessage);
  }
} 