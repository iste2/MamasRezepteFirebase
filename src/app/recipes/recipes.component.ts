import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RecipeService } from './services/recipe.service';
import { Recipe } from './interfaces/recipe.interface';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    TagModule,
    NgOptimizedImage,
    ProgressSpinnerModule
  ],
  template: `
    <div class="p-4">
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
          layout="grid"
        >
          <ng-template pTemplate="grid" let-recipes>
            <div class="grid">
              @for (recipe of recipes; track recipe.id) {
                <div class="col-12 sm:col-6 lg:col-4 xl:col-3 p-2">
                  <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-column align-items-center gap-3">
                      <img
                        [ngSrc]="recipe.imageUrl"
                        [alt]="recipe.title"
                        width="300"
                        height="200"
                        class="w-full border-round"
                        priority
                      />
                      <div class="text-2xl font-bold">{{ recipe.title }}</div>
                      <div class="text-center">{{ recipe.description }}</div>
                      <div class="flex flex-wrap gap-2">
                        @for (tag of recipe.tags; track tag) {
                          <p-tag [value]="tag"></p-tag>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </ng-template>
        </p-dataView>
      }
    </div>
  `
})
export class RecipesComponent implements OnInit {
  recipeService = inject(RecipeService);

  ngOnInit(): void {
    this.recipeService.fetchRecipes();
  }
} 