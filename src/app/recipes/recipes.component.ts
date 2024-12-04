import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RecipeService } from './services/recipe.service';
import { Recipe } from './interfaces/recipe.interface';
import { AppBarComponent } from '../components/app-bar/app-bar.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    TagModule,
    NgOptimizedImage,
    ProgressSpinnerModule,
    AppBarComponent
  ],
  template: `
    <app-bar></app-bar>
    <div class="flex justify-content-center">
      <div class="w-full max-w-7xl p-4">
        @if (recipeService.isLoading()) {
          <div class="flex justify-content-center">
            <p-progressSpinner />
          </div>
        } @else if (recipeService.error()) {
          <div class="flex justify-content-center">
            <p class="text-red-500">{{ recipeService.error() }}</p>
          </div>
        } @else {
          <p-dataView
            [value]="recipeService.recipes()"
            layout="list"
          >
            <ng-template pTemplate="list" let-recipes>
              <div class="flex flex-column gap-4">
                @for (recipe of recipes; track recipe.id) {
                  <div class="flex surface-card p-4 border-round">
                    <div class="w-12rem flex-shrink-0">
                      <img
                        [ngSrc]="recipe.imageUrl"
                        [alt]="recipe.title"
                        width="200"
                        height="150"
                        class="w-full border-round"
                        priority
                      />
                    </div>
                    <div class="flex-1 flex flex-column gap-3 pl-4">
                      <div class="text-2xl font-bold">{{ recipe.title }}</div>
                      <div class="flex gap-2">
                        @for (tag of recipe.tags; track tag) {
                          <p-tag [value]="tag"></p-tag>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </ng-template>
          </p-dataView>
        }
      </div>
    </div>
  `
})
export class RecipesComponent implements OnInit {
  recipeService = inject(RecipeService);

  ngOnInit(): void {
    this.recipeService.fetchRecipes();
  }
} 