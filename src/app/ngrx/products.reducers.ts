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
  NEW = 'New'
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
    
    // these are get all products cases 
    case ProductsActions.getAllProducts.type :
        return {... state , dataState : ProductsStateEnum.LOADING} ; 
      break;
    case ProductsActions.getAllProductsError.type :
        return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (action as any).payload }
      break;
    case ProductsActions.getAllProductsSuccess.type :
        return {...state, dataState : ProductsStateEnum.LOADED, products : (action as any).payload }
      break;
    
    // these are get selected products cases
    case ProductsActions.getSelectedProducts.type :
        return {... state , dataState : ProductsStateEnum.LOADING} ; 
      break;
    case ProductsActions.getSelectedProductsError.type :
        return {...state, dataState : ProductsStateEnum.ERROR, errorMessage : (action as any).payload }
      break;
    case ProductsActions.getSelectedProductsSuccess.type :
        return {...state, dataState : ProductsStateEnum.LOADED, products : (action as any).payload }
      break;
    
    // these are delete product cases 
    case ProductsActions.deleteProduct.type :
      console.log("Action dispatched by the component" + action.type + "recieved by the reducer");
      console.log("reducer sending back the state to the component : LOADING");
      return {...state, dataState : ProductsStateEnum.LOADING } ;
      break 
    case ProductsActions.deleteProductError.type : // in this case the effects will return an Action of type Error and a payload containing the error message
      return {...state, dataState : ProductsStateEnum.ERROR , errorMessage : (action as any).payload } // action is of type Action[interface] that has no payload property 
      break
    case ProductsActions.deleteProductSuccess.type : 
    console.log("Action dispatched by the effect" + action.type + "recieved by the reducer");
      console.log("reducer sending back the state to the component : LOADED");
      const deletedProductId = (action as any).payload as number;
      // now we should take the array of products and create a copy of it that doesnt have an element with this id
      const newProductsList: Product[] = state.products.filter((product) => product.id !== deletedProductId);
      return {... state, dataState : ProductsStateEnum.LOADED, products : newProductsList} // the state we are returning here is the latest one in the store but not the latest fetched one 
      break
    // reducers related to the actions of select
    // first when we dispatch select product, we will return a new state with a status of LOADING 
    case ProductsActions.selectProduct.type : 
    return {...state, dataState : ProductsStateEnum.LOADING}
    break 

    case ProductsActions.selectProductSuccess.type :
      // we first extract the updated Product from the payload
      let updatedProduct: Product = (action as any).payload;
      // the state is never changed its immutable 
      // thus we need to create a new state from the old one 
      // here we should create an updated array of Products from the last array in the last state 
      // Iterate Over the Existing Array: map iterates over each product in state.products.
      // map returns a new array, which aligns with the immutable update pattern required in reducers.
      let updatedProducts: Product[] = state.products.map(product => product.id === updatedProduct.id? updatedProduct : product); 
      return {...state , dataState : ProductsStateEnum.LOADED, products: updatedProducts} 
    break
    case ProductsActions.selectProductError.type :
       // if so we will return a new state 
       // the component observing state, will get an observable containing the new state and will change the view 
       return {...state, dataState : ProductsStateEnum.ERROR , errorMessage : (action as any).payload }
    break

  // search Products Actions
  case ProductsActions.searchProduct.type : 
      return {...state, dataState: ProductsStateEnum.LOADING}
  break

  case ProductsActions.searchProductSuccess.type : 
  // in this case we will return an entirely new state 
    return {...state, dataState: ProductsStateEnum.LOADED, products : (action as any).payload}
  break

  case ProductsActions.searchProductError.type : 
    return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (action as any).payload}
  break

  // cases for creating a product 
  case ProductsActions.createProduct.type : 
  return {...state, dataState: ProductsStateEnum.LOADING}
  break 

  case ProductsActions.createProductSuccess.type : 
  // const numbers = [1, 2, 3];
  // const newNumbers = [...numbers];
  // const newNumbers = [0, ...numbers]; // [0, 1, 2, 3]
  let newProduct : Product = (action as any).payload;
  let newProducts : Product[] = [newProduct, ...state.products]; // here we create a new array that begins with the new products and copies all the element of the old array using ...
  return {...state , dataState: ProductsStateEnum.LOADED , products : newProducts }
  break
  case ProductsActions.createProduct.type : 
  return {...state, dataState: ProductsStateEnum.ERROR, errorMessage: (action as any).payload }
  break 

  // new Products Actions
  case ProductsActions.newProduct.type : 
      return {...state, dataState: ProductsStateEnum.LOADING} // this means we are loading the form data
  break

  case ProductsActions.newProductSuccess.type : 
  
    return {...state, dataState: ProductsStateEnum.NEW}// the form is ready to be built 
  break

  case ProductsActions.newProductError.type : 
    return {...state, dataState: ProductsStateEnum.ERROR}
  break
    default: return {...state} 
      break;
  }
};  
