import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

import { AddClientDialogComponent } from './add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';
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
  displayedColumns: string[] = ['name', 'accountType', 'balance', 'edit', 'report'];

  constructor(private dataService: DataService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
        this.dataService.deleteClient(client.id).subscribe(() => {
          this.snackBar.open('Cliente eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.loadClients();
        });
      }
    });
  }

  openReportDialog(client: any): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      data: { client }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.generateReport(client.id, result.startDate, result.endDate);
      }
    });
  }

  generateReport(clientId: number, startDate: string, endDate: string): void {
    this.dataService.getClientConsumptionHistory(clientId, startDate, endDate).subscribe((data: any[]) => {
      const now = new Date();
      const localdate = now.toLocaleDateString();
      const doc = new jsPDF();
      doc.setFontSize(8);
      const clientName = data[0].clientName; // Obtener el nombre del cliente

      doc.text(`Reporte de Consumo - ${clientName}`, 10, 10);
      doc.text(`Fecha de Inicio: ${startDate}`, 10, 20);
      doc.text(`Fecha de Fin: ${endDate}`, 10, 30);
      doc.text(`Fecha de elaboración de reporte: ${localdate}`, 10, 40);

      const rows = data.map(item => [
        item.date,
        item.productName,
        item.quantity,
        `GTQ ${item.totalPrice}`
      ]);

      // Calcular el total
      const total = data.reduce((sum, item) => sum + item.totalPrice, 0);

      // Agregar una fila final con el total
      rows.push(['', '', 'Total', `GTQ ${total}`]);

      autoTable(doc, {
        startY: 50, // Especificar la posición de inicio de la tabla
        head: [['Fecha', 'Producto', 'Cantidad', 'Precio Total']],
        body: rows,
      });

      // Reemplazar espacios y caracteres especiales en el nombre del cliente para el nombre del archivo
      const sanitizedClientName = clientName.replace(/[^a-zA-Z0-9]/g, '_');

      doc.save(`Consumo_${sanitizedClientName}_${localdate}.pdf`);
    });
  }
}