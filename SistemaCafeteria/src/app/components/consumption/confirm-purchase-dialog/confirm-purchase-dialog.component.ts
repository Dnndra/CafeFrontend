import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-purchase-dialog',
  templateUrl: './confirm-purchase-dialog.component.html',
  styleUrls: ['./confirm-purchase-dialog.component.css']
})
export class ConfirmPurchaseDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmPurchaseDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}