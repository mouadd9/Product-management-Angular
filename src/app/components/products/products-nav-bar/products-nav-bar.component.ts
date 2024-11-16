import { Component, } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsActions } from '../../../ngrx/products.actions';

@Component({
  selector: 'app-products-nav-bar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.css',
})
export class ProductsNavBarComponent {
  constructor(private store: Store<any>) {}
  productName = new FormControl('');

  //@Output() eventEmitter: EventEmitter<ActionEvent> =new EventEmitter<ActionEvent>(); // this is an event emitter , we will use it to send events to the parent component
  // we will send a message of type ActionEvent to specify what we want to do and the payload
  // now we need to listen to the events emitted by this event emitter in the parent component template using the (messageEvent)

  onSubmit() {
   
  }
  getSelectedProducts() {
  
  }
  getAllProducts() {
    console.log('Dispatching getAllProducts action');
    this.store.dispatch(ProductsActions.getAllProducts())
    
  }
  getAvailableProducts() {
   
  }
}
