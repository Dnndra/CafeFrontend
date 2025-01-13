import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  product: any = {};
  selectedFile: File | null = null;
  fileName: string = '';
  tags: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar // Importa MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('90vw', '90vh'); // Ajusta el tamaño del diálogo
    this.loadTags();
  }

  loadTags(): void {
    this.dataService.getTags().subscribe(
      (tags: any[]) => {
        this.tags = tags.map(tag => tag.tag); // Asegúrate de usar la propiedad correcta del objeto
      },
      (error: any) => {
        this.snackBar.open('Error al cargar los tags', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : '';
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.product.image = e.target.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  addProduct(): void {
    if (this.selectedFile) {
      this.dataService.createProduct(this.product, this.selectedFile).subscribe(
        (response: any) => {
          this.snackBar.open('Producto agregado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.dialogRef.close(true);
        },
        (error: any) => {
          const errorMessage = error.error.message || 'Error al agregar el producto';
          this.snackBar.open(errorMessage, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      );
    } else {
      this.snackBar.open('Por favor, seleccione una imagen', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }
}