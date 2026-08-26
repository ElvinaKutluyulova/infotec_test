import { Component, inject, signal } from '@angular/core';
import { MenuCard } from '../../components/card/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CocktailService, Cocktail } from '../../services/coctail.service';
import { CocktailForm } from '../../components/coctail-form/cocktail-form';

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
  private dialog = inject(MatDialog);

  cocktails = signal<Cocktail[]>(this.cocktailService.getCocktails());

  openAddDialog(): void {
    const dialogRef = this.dialog.open(CocktailForm, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cocktailService.addCocktail(
          result.name,
          result.preparation,
          result.image
        );
        this.cocktails.set(this.cocktailService.getCocktails());
      }
    });
  }

  editCocktail(cocktail: Cocktail): void {
    const dialogRef = this.dialog.open(CocktailForm, {
      width: '500px',
      data: cocktail,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cocktailService.updateCocktail(
          cocktail.id,
          result.name,
          result.preparation,
          result.image
        );
        this.cocktails.set(this.cocktailService.getCocktails());
      }
    });
  }

  deleteCocktail(id: number): void {
    this.cocktailService.deleteCocktail(id);
    this.cocktails.set(this.cocktailService.getCocktails());
  }
}