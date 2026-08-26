import { Component, inject, signal } from '@angular/core';
import { Cocktail } from '../../services/coctail.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cocktail-form',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './cocktail-form.html',
  styleUrl: './cocktail-form.scss',
})
export class CocktailForm {
  private dialogRef = inject(MatDialogRef<CocktailForm>);
  private data = inject<Cocktail | null>(MAT_DIALOG_DATA);

  name = signal(this.data?.name || '');
  preparation = signal(this.data?.preparation || '');
  imagePreview = signal<string | null>(this.data?.image || null);
  isEdit = signal(!!this.data);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imagePreview.set(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.imagePreview.set(null);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';
  }

  onSave(): void {
    if (this.name().trim() && this.preparation().trim()) {
      this.dialogRef.close({
        name: this.name().trim(),
        preparation: this.preparation().trim(),
        image: this.imagePreview() || undefined,
      });
    }
  }
}