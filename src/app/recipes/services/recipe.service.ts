import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Recipe } from '../interfaces/recipe.interface';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private firestore = inject(Firestore);
  
  recipes = signal<Recipe[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);

  async fetchRecipes(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.error.set(null);
      
      const recipesRef = collection(this.firestore, 'recipes');
      const snapshot = await getDocs(recipesRef);
      
      const recipes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
      
      this.recipes.set(recipes);
    } catch (error) {
      this.error.set('Failed to load recipes');
      console.error('Error fetching recipes:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
} 