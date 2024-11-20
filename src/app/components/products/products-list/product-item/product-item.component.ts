import {
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../../../../models/product.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../../../ngrx/products.actions';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
})
export class ProductItemComponent {
  constructor(private store: Store<any>) {}

  // now we need an input ta access the data we need , so for each product we need to pass the product
  @Input() product!: Product;
  // here we will send events to the parent component
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();


  // here we should dispatch two new actions with side effects 
  // select a product 
  // delete a product
  // first we need to add the actions to the products feature 
  // the action that we dispatch needs to have a payload of type product
  // the initial returned state by the reducer will be Loading, 
  // meanwhile effects will catch this action and return an observable of type Action that has the state LOADED
  OnSelect(product: Product) { // okay we want this action to work 
    // first we will create an action called selectProduct
    // this action will be dispatched, it will contain a payload of products and a type of [Products] select product 
    // this will be dispatched to both the reducer and effects , the reducer will return first a state of {dataState:LOADING, products = {...state}, ..}
    // then when the effects will dipatch actions of success or failure that will affect the state 
    this.store.dispatch(ProductsActions.selectProduct({payload : product}));
    
  }
  OnDelete(product: Product) {
    console.log("action" + ProductsActions.deleteProduct.type + "dispatched by the store");
    this.store.dispatch(ProductsActions.deleteProduct({payload : product}));
   
    
  }
}
