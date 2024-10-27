import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

// we should use @Injectable so it can be injected into components
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  deleteProduct(p: Product) : Observable<void> {
    return this.http.delete<void>(this.host + '/products/' + p.id);
    
  }
  host = environment.host;
  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.host + '/products');
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?available=true');
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?selected=true');
  }

  searchProduct(keyword: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + '/products?name=' + keyword)
  }

  select(p : Product) : Observable<Product> {
    p.selected = !p.selected ; 
    return this.http.put<Product>(this.host + '/products/' + p.id , p );
  }

  createProduct(p:Product) : Observable<Product> {
    return this.http.post<Product>(this.host + '/products', p);
  }
}
