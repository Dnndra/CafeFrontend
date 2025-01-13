import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-product',
  templateUrl: './confirm-delete-product.component.html',
  styleUrls: ['./confirm-delete-product.component.css']
})
export class ConfirmDeleteProductComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}