import { Component, input } from '@angular/core';

@Component({
  selector: 'menu-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class MenuCard {
  name = input<string>('Название коктейля');
  ingredients = input<string>('Ингредиенты');
  price = input<string>('₽');
  emoji = input<string>('🍸');
}