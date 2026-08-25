import { Injectable } from '@angular/core';

export interface Cocktail {
  id: number;
  name: string;
  preparation: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private storageKey = 'cocktails';
  private cocktails: Cocktail[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.cocktails = JSON.parse(data);
      this.nextId = this.cocktails.reduce((max, c) => Math.max(max, c.id), 0) + 1;
    } else {
      this.cocktails = [];
      this.nextId = 1;
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cocktails));
  }

  getCocktails(): Cocktail[] {
    return [...this.cocktails];
  }

  addCocktail(cocktail: Omit<Cocktail, 'id'>): Cocktail {
    const newCocktail = {
      ...cocktail,
      id: this.nextId++
    };
    this.cocktails.push(newCocktail);
    this.saveToStorage();
    return newCocktail;
  }

  updateCocktail(id: number, data: Partial<Omit<Cocktail, 'id'>>): Cocktail | undefined {
    const index = this.cocktails.findIndex(c => c.id === id);
    if (index === -1) return undefined;
    
    this.cocktails[index] = {
      ...this.cocktails[index],
      ...data
    };
    this.saveToStorage();
    return this.cocktails[index];
  }

  deleteCocktail(id: number): boolean {
    const index = this.cocktails.findIndex(c => c.id === id);
    if (index === -1) return false;
    
    this.cocktails.splice(index, 1);
    this.saveToStorage();
    return true;
  }
}