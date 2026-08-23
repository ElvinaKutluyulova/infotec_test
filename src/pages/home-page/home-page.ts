import { Component } from '@angular/core';
import { MenuCard } from '../../components/card/card';

@Component({
  selector: 'home-page',
  imports: [MenuCard],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  items = [1, 2, 3, 4, 5, 6];
}