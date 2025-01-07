import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../../services/data.service';
@Component({
  selector: 'app-add-client-dialog',
  templateUrl: './add-client-dialog.component.html',
  styleUrls: ['./add-client-dialog.component.css']
})
export class AddClientDialogComponent {
  client = { name: '', email: '' };

  constructor(
    public dialogRef: MatDialogRef<AddClientDialogComponent>,
    private dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addClient(): void {
    this.dataService.createClient(this.client).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}