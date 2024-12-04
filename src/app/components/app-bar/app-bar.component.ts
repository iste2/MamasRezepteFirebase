import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [CommonModule, ToolbarModule, ButtonModule],
  template: `
    <p-toolbar>
      <div class="flex w-full max-w-7xl mx-auto">
        <span class="text-2xl font-bold">Mamas Rezepte</span>
        <div class="flex-1"></div>
        <div class="flex align-items-center gap-3">
          <span>Hello, {{ authService.currentUser()?.email }}</span>
          <p-button 
            label="Logout" 
            severity="secondary" 
            (onClick)="authService.logout()"
          ></p-button>
        </div>
      </div>
    </p-toolbar>
  `
})
export class AppBarComponent {
  authService = inject(AuthService);
} 