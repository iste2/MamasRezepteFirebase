import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: RecipesComponent }
    ])
  ],
  providers: [
    provideFirestore(() => getFirestore())
  ]
})
export class RecipesModule { }