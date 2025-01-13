import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { ConfirmDeleteProductComponent } from './confirm-delete-product/confirm-delete-product.component';
import { AddTagDialogComponent } from './add-tag-dialog/add-tag-dialog.component'; // Importa AddTagDialogComponent

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  tagTerm: string = '';
  tags: string[] = [];
  displayedColumns: string[] = ['name', 'price', 'tag', 'image', 'edit']; // Actualiza las columnas mostradas

  constructor(private dataService: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadTags();
  }

  loadProducts(): void {
    this.dataService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data;
    });
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

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.tagTerm === '' || product.tag.toLowerCase() === this.tagTerm.toLowerCase())
    );
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openEditProductDialog(product: any): void {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  confirmDeleteProduct(product: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteProductComponent, {
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteProduct(product);
      }
    });
  }

  deleteProduct(product: any): void {
    this.dataService.deleteProduct(product.id).subscribe(
      () => {
        this.snackBar.open('Producto eliminado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.loadProducts();
      },
      (error: any) => {
        this.snackBar.open('Error al eliminar el producto', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  openAddTagDialog(): void {
    const dialogRef = this.dialog.open(AddTagDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTags();
      }
    });
  }
}