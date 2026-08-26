import { Injectable } from '@angular/core';

export interface Cocktail {
  id: number;
  name: string;
  preparation: string;
  image?: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private storageKey = 'cocktails';
  private cocktails: Cocktail[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.cocktails = JSON.parse(data);
    } else {
      this.cocktails = [];
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cocktails));
  }

  getCocktails(): Cocktail[] {
    return [...this.cocktails];
  }

  addCocktail(name: string, preparation: string, image?: string): Cocktail {
    const newCocktail = {
      id: this.cocktails.length + 1,
      name: name,
      preparation: preparation,
      image: image || '',
      updatedAt: new Date().toISOString()
    };
    this.cocktails.push(newCocktail);
    this.saveToStorage();
    return newCocktail;
  }

  updateCocktail(id: number, name: string, preparation: string, image?: string): Cocktail | undefined {
    for (let i = 0; i < this.cocktails.length; i++) {
      if (this.cocktails[i].id === id) {
        this.cocktails[i].name = name;
        this.cocktails[i].preparation = preparation;
        this.cocktails[i].image = image || '';
        this.cocktails[i].updatedAt = new Date().toISOString();
        this.saveToStorage();
        return this.cocktails[i];
      }
    }
    return undefined;
  }

  deleteCocktail(id: number): boolean {
    const index = this.cocktails.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.cocktails.splice(index, 1);
    this.saveToStorage();
    return true;
  }
}