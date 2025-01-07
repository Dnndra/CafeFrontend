import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../../services/data.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.css']
})
export class EditClientDialogComponent {
  client: any;
  accountTypes: string[] = ['Credito', 'Prepago', 'Abierta']; // Define los tipos de cuenta

  constructor(
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private snackBar: MatSnackBar // Importa MatSnackBar
  ) {
    this.client = { ...data.client };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateClient(): void {
    this.dataService.updateClient(this.client).subscribe(
      (response: HttpResponse<any>) => {
        if (response.status == 200) {
          this.snackBar.open('Cliente actualizado con éxito', 'Cerrar', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        } else {
          this.snackBar.open('Error al actualizar el cliente', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    );
  }
}