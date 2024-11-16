// here we will define reducers that will return a new state to the store and react to actions

import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductsActions } from './products.actions';

// here we will modify the state
// here we define what the state will look like
// and here we will declare the diff forms a state can take

export enum ProductsStateEnum {
  // either the state is Idle/Loading/Loaded or Encountered an error while loading
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
}

// now that we defined the different phases that our state can go through
// we should define the structure of our state

export interface ProductsState {
  products: Product[]; // this is the actual data
  dataState: ProductsStateEnum; // this is its state
  errorMessage: string; // this is the error message if the state is in ERROR
}

const initialState: ProductsState = {
  products: [],
  dataState: ProductsStateEnum.INITIAL,
  errorMessage: '',
};


// when we dispatch an action , using this syntax : 
// this.store.dispatch(ProductsActions.getAllProducts());
// ProductsActions.getAllProducts() --> generates an action object

// our reducer will take in this action ad argument 
// and we will compare action.type with the different types we declared
// using the createActionsGroup 

export function productsReducer(state: ProductsState = initialState , action: Action ): ProductsState {
  switch (action.type) {
    case ProductsActions.getAllProducts.type :
        return {... state , dataState : ProductsStateEnum.LOADING} ; 
      break;
    case ProductsActions.getAllProductsError.type :
        return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (action as any).payload }
      break;
    case ProductsActions.getAllProductsSuccess.type :
        return {...state, dataState : ProductsStateEnum.LOADED, products : (action as any).payload }
      break;
    default: return {...state} 
      break;
  }
};  
