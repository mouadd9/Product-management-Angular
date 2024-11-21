import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { ProductsActions } from '../../ngrx/products.actions';
import { ProductsStateEnum } from '../../ngrx/products.reducers';

@Component({
  selector: 'app-productform',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], // here we only import Modules , Modules include services ad injectables that we inject via constructor
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.css'
})
export class ProductformComponent implements OnInit {

  // so before creating the formGroup we need to make sure that the state is available , Why ? 
  // in case we want to use the data in our form (a slider for example) 
  // but how ? 
  // so we will create three actions 
  // newProduct 
  // newProductSuccess
  // newProductError
  // these actions have specific jobs 
  // so before giving the user the capacity to create a product we should make sure that we have the latest state


  productsFormGroup!: FormGroup;
  productsState: ProductsStateEnum | null = null; 
  readonly ProductsStateEnum = ProductsStateEnum;

  constructor(private fb : FormBuilder, private store: Store<any>){ // here we inject the store
  }

  ngOnInit(): void {
    // first we dispatch an action called newProduct
    // this action is intended to populate the form with data that will be shown as default data
    this.store.dispatch(ProductsActions.newProduct()) ;

    // now if the dataState is NEW this means all necessary data is fetched and we can now build the form group
    this.store.pipe(select((state)=> state.products )).subscribe(
      (productsState) => {
        this.productsState = productsState.dataState;
        if( productsState.dataState === ProductsStateEnum.NEW ){
          this.productsFormGroup = this.fb.group({
            name : ["", Validators.required],
            price : [0, Validators.required],
            quantity : [0, Validators.required],
            available : [true, Validators.required],
            selected : [true, Validators.required]
      
          });

        }
      }
      )

    
    
  }

  onSubmit(){

   this.store.dispatch(ProductsActions.createProduct({payload: this.productsFormGroup.value}));
   // { type : .. , payload : {product} }

  }

  NewProduct() {
    this.store.dispatch(ProductsActions.newProduct());
    }

}
