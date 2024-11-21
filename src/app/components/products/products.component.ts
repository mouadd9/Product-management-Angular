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
import { select, Store } from '@ngrx/store';
import { ProductsState } from '../../ngrx/products.reducers';
import { ProductsActions } from '../../ngrx/products.actions';

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

// now this component doesnt call any backend service 
// it only dispatches actions to the store 
// and then it uses the store to get a specific state 

export class ProductsComponent implements OnInit {
  // this an Observable that wrappes around a stream of ProductsState
  // meaning each time product state changes are triggered by the reducer a new state is emitted to this stream
  // how can we get this Observable , we get it using the store , so the store stracks different slices of states 
  // here we only need the products state 
  productsState$: Observable<ProductsState>; 

  constructor(
    private store: Store<any>
  ) {
    // we use pipe in order to manipulate the events streamed before returning an observable
    // we use select() that takes in the state and returns the needed slice of the state
    // now this.store() will not return an observable of the entire state but rather an observable of only the slice
    this.productsState$ = this.store.pipe(select((state) => state.products ));
  }

  ngOnInit(): void {

    
  }

  getAllProducts() {
    
    
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
