import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-tag-dialog',
  templateUrl: './add-tag-dialog.component.html',
  styleUrls: ['./add-tag-dialog.component.css']
})
export class AddTagDialogComponent {
  tag: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddTagDialogComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTag(): void {
    if (this.tag.trim()) {
      this.dataService.createTag({ tag: this.tag }).subscribe(
        (response: any) => {
          this.snackBar.open('Etiqueta agregada con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        (error: any) => {
          const errorMessage = error.error.message || 'Error al agregar la etiqueta';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this.snackBar.open('Por favor, ingrese una etiqueta', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }
}