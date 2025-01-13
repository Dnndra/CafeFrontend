import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api'; // Aquí pondrás la URL de tu API Node.js

  constructor(private http: HttpClient) {}

  // CRUD de usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  // CRUD de clientes
  getClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}/clients`);
  }

  createClient(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/clients`, client);
  }

  updateClient(client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/clients/${client.id}`, client, { observe: 'response' });
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clients/${id}`);
  }
  
  // CRUD de productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }

  createProduct(productData: any, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', productData.name);
    formData.append('stock', productData.stock);
    formData.append('price', productData.price);
    formData.append('threshold', productData.threshold);
    formData.append('tag', productData.tag);
    formData.append('image', imageFile);
    return this.http.post<any>(`${this.apiUrl}/products`, formData);
  }

  updateProduct(productData: any, imageFile?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('tag', productData.tag);
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return this.http.put<any>(`${this.apiUrl}/products/${productData.id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`);
  }

    // CRUD de tags
    getTags(): Observable<any> {
      return this.http.get(`${this.apiUrl}/tags`);
    }

    createTag(client: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/tags`, client);
    }

    registerConsumption(consumptionData: { clientId: number, products: { productId: number, quantity: number }[] }): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/consumption`, consumptionData);
    }
  
}