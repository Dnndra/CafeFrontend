import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MenuComponent } from './components/menu/menu.component';

import { ConsumptionComponent } from './components/consumption/consumption.component';
import { AuthService } from './services/auth.service';
import { MenuModule } from './components/menu/menu.module';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './components/clients/clients.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AddClientDialogComponent } from './components/clients/add-client-dialog/add-client-dialog.component';
import { EditClientDialogComponent } from './components/clients/edit-client-dialog/edit-client-dialog.component';
import { DataService } from './services/data.service';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'purchase', component: ConsumptionComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
]

@NgModule({
  declarations: [
    LoginComponent,
    ConsumptionComponent,
    ClientsComponent,
    AddClientDialogComponent,
    EditClientDialogComponent
  ],
  imports: [
    HttpClientModule,
    MenuModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatTableModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    RouterModule.forRoot(routes), // Define las rutas aquí
    AppComponent,
    CommonModule
  ],
  exports:[RouterModule],
  providers: [AuthService,DataService, provideHttpClient(withFetch())]
})
export class AppModule { }