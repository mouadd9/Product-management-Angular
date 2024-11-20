import { Component, } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  // first we create a form group 
  // method 1
  formGroupV1 = new FormGroup({
    productName : new FormControl('', [Validators.required])
  })

  // method 2 
  // is to create the form group property here and intiliaze it in the constructor using an injected object
  formGroupV2 : FormGroup; // after building this formGroup, its form controls values change reactively when we type into an input

  constructor(private store: Store<any>, private fb: FormBuilder) {
    // here we will initialize the form group property using form builder 
    this.formGroupV2 = fb.group({ // this created the form group
      productName: ['', [Validators.required]] 
    });
  }
   

  //@Output() eventEmitter: EventEmitter<ActionEvent> =new EventEmitter<ActionEvent>(); // this is an event emitter , we will use it to send events to the parent component
  // we will send a message of type ActionEvent to specify what we want to do and the payload
  // now we need to listen to the events emitted by this event emitter in the parent component template using the (messageEvent)

  onSearch() {
    if (this.formGroupV2.valid){
      // here this.formGroupV2.value returns an object that has controls as properties 
      console.log(this.formGroupV2.value.productName);
      // we will dispatch an action to the store to search for a product
      // we will create an action and pass it to the store 
      this.store.dispatch(ProductsActions.searchProduct({payload: this.formGroupV2.value.productName}));
    }
  }
  getSelectedProducts() {
    // this.store.dispatch(takes in an action)
    // ProductsActions is a group of action 
    // ProductsActions.getSelectedProducts.type is the type of the action 
    // while this : ProductsActions.getSelectedProducts() creates an object {type : .. , paylaod : .. } = action
    this.store.dispatch(ProductsActions.getSelectedProducts())
  
  }
  getAllProducts() {
    console.log('Dispatching getAllProducts action');
    this.store.dispatch(ProductsActions.getAllProducts())
    
  }
  getAvailableProducts() {
   
  }
}
