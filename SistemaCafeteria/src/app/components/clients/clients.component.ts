import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from '../../services/data.service'; // Importa DataService
import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  searchTerm: string = '';
  accountTypeTerm: string = ''; // Agrega esta línea
  accountTypes: string[] = ['Credito', 'Prepago', 'Abierta']; // Define los tipos de cuenta
  displayedColumns: string[] = ['name', 'accountType', 'balance', 'edit'];

  constructor(private dataService: DataService, public dialog: MatDialog) {} // Usa DataService

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.dataService.getClients().subscribe((data: any[]) => { // Usa getClients de DataService
      this.clients = data;
      this.filteredClients = data;
    });
  }

  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.accountTypeTerm === '' || client.accountType.toLowerCase() === this.accountTypeTerm.toLowerCase()) // Ajusta esta línea
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
}