import { Component, inject } from '@angular/core';
import { MenuCard } from '../../components/card/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { CocktailService, Cocktail } from '../../services/coctail.service';

@Component({
  selector: 'home-page',
  imports: [
    MenuCard,
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  private cocktailService = inject(CocktailService);
  
  cocktails: Cocktail[] = this.cocktailService.getCocktails();

  openAddDialog() {
    console.log('Открыть диалог создания');
  }

  editCocktail(cocktail: Cocktail) {
    console.log('Редактировать:', cocktail);
  }

  deleteCocktail(id: number) {
    this.cocktailService.deleteCocktail(id);
    this.cocktails = this.cocktailService.getCocktails();
  }
}