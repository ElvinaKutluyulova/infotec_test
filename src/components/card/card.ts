import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Cocktail } from '../../services/coctail.service';

@Component({
  selector: 'menu-card',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class MenuCard {
  cocktail = input.required<Cocktail>();
  edit = output<Cocktail>();
  delete = output<number>();

  onEdit(): void {
    this.edit.emit(this.cocktail());
  }

  onDelete(): void {
    this.delete.emit(this.cocktail().id);
  }
}