import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditClientDialogComponent implements OnInit {
  client: any;
  accountTypes: string[] = ['Wallet', 'Abierta', 'Credito']; // Define los tipos de cuenta

  constructor(
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private snackBar: MatSnackBar // Importa MatSnackBar
  ) {
    this.client = { ...data.client };
  }
  ngOnInit(): void {
    this.dialogRef.updateSize('90vw', '90vh'); // Ajusta el tamaño del diálogo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateClient(): void {
    this.dataService.updateClient(this.client).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status === 200) {
          this.showSnackBar('Cliente actualizado con éxito', 'success-snackbar');
          this.dialogRef.close(true);
        } else {
          this.showSnackBar('Error al actualizar el cliente', 'error-snackbar');
        }
      },
      (error: any) => {
        this.showSnackBar('Error al actualizar el cliente', 'error-snackbar');
      }
    );
  }

  private showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}