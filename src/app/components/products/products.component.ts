import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import {
  map,
  Observable,
  Subscription,
} from 'rxjs';

import { RouterModule } from '@angular/router';
import { ProductsNavBarComponent } from './products-nav-bar/products-nav-bar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { Store } from '@ngrx/store';
import { GetAllProductsAction } from '../../ngrx/products.actions';
import { ProductsState } from '../../ngrx/products.reducers';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProductsNavBarComponent,
    ProductsListComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
// This component will be responsible for calling the service and storing the observable.
export class ProductsComponent implements OnInit {
  // here we should create an observable of type productsState
  productsState$ : Observable<ProductsState> | null = null;

  constructor(
    private store: Store<any>
  ) {}

  ngOnInit(): void {
    this.productsState$ = this.store.pipe(
      map((state) => state.products)
    )
    
  }

  getAllProducts() {
    this.store.dispatch(new GetAllProductsAction({}))
    
  }

  getSelectedProducts() {
    
   
  }

  getAvailableProducts() {
   
   
  }

  onSubmit(keyword: any) {

  }

  OnSelect(p: Product) {
    
  }

  OnDelete(p: Product) {
  
  }

 
}
