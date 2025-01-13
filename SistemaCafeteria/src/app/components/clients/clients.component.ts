import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  searchTerm: string = '';
  accountTypeTerm: string = '';
  accountTypes: string[] = ['Credito', 'Prepago', 'Abierta'];
  displayedColumns: string[] = ['name', 'accountType', 'balance', 'edit'];

  constructor(private dataService: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.dataService.getClients().subscribe((data: any[]) => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.accountTypeTerm === '' || client.accountType.toLowerCase() === this.accountTypeTerm.toLowerCase())
    );
  }

  openAddClientDialog(): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  openEditClientDialog(client: any): void {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: { client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients();
      }
    });
  }

  confirmDeleteClient(client: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      data: { client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteClient(client);
      }
    });
  }

  deleteClient(client: any): void {
    this.dataService.deleteClient(client.id).subscribe(
      () => {
        this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.loadClients();
      },
      (error: any) => {
        this.snackBar.open('Error al eliminar el cliente', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}