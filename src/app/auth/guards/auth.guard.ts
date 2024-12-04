import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return toObservable(authService.currentUser).pipe(
    map(user => {
      if (user) return true;
      
      router.navigate(['/auth/login']);
      return false;
    })
  );
}; 