import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {
  clients: any[] = [];
  filteredClients: any[] = [];
  selectedClient: any = null;
  searchTerm: string = '';
  products: any[] = [];
  filteredProducts: any[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  consumptionItems: any[] = [];
  subtotal: number = 0;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadProducts();
    this.loadTags();
  }

  loadClients(): void {
    this.dataService.getClients().subscribe(
      (clients: any[]) => {
        this.clients = clients;
        this.filteredClients = clients;
      },
      (error: any) => {
        this.snackBar.open('Error al cargar los clientes', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  filterClients(): void {
    if (!this.searchTerm) {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectClient(client: any): void {
    this.selectedClient = client;
    this.searchTerm = client.name; // Actualizar el campo de entrada con el nombre del cliente
  }

  loadProducts(): void {
    this.dataService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products;
        this.filteredProducts = products;
        this.categories = [...new Set(products.map(product => product.category))];
      },
      (error: any) => {
        this.snackBar.open('Error al cargar los productos', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  loadTags(): void {
    this.dataService.getTags().subscribe(
      (tags: any[]) => {
        this.categories = tags.map(tag => tag.tag); // Asegúrate de usar la propiedad correcta del objeto
      },
      (error: any) => {
        this.snackBar.open('Error al cargar las etiquetas', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  filterProductsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.filteredProducts = this.products;
    }
  }

  addProductToConsumption(product: any): void {
    const existingItem = this.consumptionItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.consumptionItems.push({ product, quantity: 1 });
    }
    this.calculateSubtotal();
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  removeProductFromConsumption(product: any): void {
    const index = this.consumptionItems.findIndex(item => item.product.id === product.id);
    if (index !== -1) {
      this.consumptionItems.splice(index, 1);
      this.calculateSubtotal();
      this.cdr.detectChanges(); // Forzar la detección de cambios
    }
  }

  updateQuantity(item: any): void {
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    this.calculateSubtotal();
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }

  calculateSubtotal(): void {
    this.subtotal = this.consumptionItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  registerConsumption(): void {
    const consumptionData = {
      clientId: this.selectedClient.id,
      products: this.consumptionItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
      }))
    };

    this.dataService.registerConsumption(consumptionData).subscribe(
      (response: any) => {
        this.snackBar.open('Consumo registrado con éxito', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.resetConsumption();
      },
      (error: any) => {
        this.snackBar.open('Error al registrar el consumo', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  resetConsumption(): void {
    this.selectedClient = null;
    this.consumptionItems = [];
    this.subtotal = 0;
    this.searchTerm = ''; // Limpiar el campo de entrada
    this.cdr.detectChanges(); // Forzar la detección de cambios
  }
}