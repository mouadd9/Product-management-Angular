// here we will define reducers that will return a new state to the store and react to actions

import { Action, ActionType } from '@ngrx/store';
import { Product } from '../models/product.model';
import { ProductsActions, ProductsActionTypes } from './products.actions';

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

// we should a function , that takes as input , the current state , and then the ACTION dispatched

export function productsReducer(state: ProductsState = initialState , action: Action ): ProductsState {
  switch (action.type) {
    case ProductsActionTypes.GET_ALL_PRODUCTS:
        return {... state , dataState : ProductsStateEnum.LOADING} ; 
      break;
    case ProductsActionTypes.GET_ALL_PRODUCTS_ERROR:
        return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (<ProductsActions>action).payload }
      break;
    case ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS:
        return {...state, dataState : ProductsStateEnum.LOADED, products : (<ProductsActions>action).payload }
      break;
    default: return {...state} 
      break;
  }
};  
