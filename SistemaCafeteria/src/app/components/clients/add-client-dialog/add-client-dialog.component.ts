import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent implements OnInit {
  client: any = {};
  accountTypes: string[] =  ['Wallet', 'Abierta', 'Credito']; // Define los tipos de cuenta

  constructor(
    public dialogRef: MatDialogRef<AddClientDialogComponent>,
    private dataService: DataService,
    private snackBar: MatSnackBar // Importa MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('90vw', '90vh'); // Ajusta el tamaño del diálogo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClient(): void {
    this.dataService.createClient(this.client).subscribe(
      (response: any) => {
        this.snackBar.open('Cliente agregado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close(true);
      },
      (error: any) => {
        const errorMessage = error.error.error || 'Error al agregar el cliente';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}