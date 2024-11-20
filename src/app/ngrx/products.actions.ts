import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';


export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    // get all actions
    getAllProducts : emptyProps(),
    getAllProductsSuccess : props<{payload : Product[]}>(),
    getAllProductsError : props<{payload : string}>(), 
    // get selected actions
    getSelectedProducts : emptyProps(),
    getSelectedProductsSuccess : props<{payload : Product[]}>(),
    getSelectedProductsError : props<{payload : string}>(), 
    // delete actions
    deleteProduct : props<{payload: Product}>(), // the action deleteProduct generates an action : {type : [Products] delete product , payload : {product}}
    // the reducer will react to this action, when its dispatched form a component, the reducer will verifiy the type then it will return the state {dataState: LOADING , errorMessage: null , products : {}}
    // effects will also be watching over all actions dispatched and when they encounter this perticular action
    // they will send an Api call then when they get the response they will dispatch an action of type success or error.
    deleteProductSuccess : props<{payload: number}>(), 
    deleteProductError : props<{payload : string}>(),

    // select product actions
    selectProduct : props<{payload : Product}>(), // when we will dispaatch an action of type selectProduct , a payload of type Product will be sent to the effects 
    // the action dispatched by the effects if the API call is successful will contain no payload, no error message no data
    selectProductSuccess : props<{payload : Product}>(),
    selectProductError : props<{payload : string}>(),


    // actions to search a product, the action SearchProduct dispatched from the component will have a payload of string containing the product name
    searchProduct: props<{payload : string}>(),
    searchProductSuccess: props<{payload : Product[]}>(),
    searchProductError: props<{payload : string}>(),

    // actions to create a product
    createProduct: props<{payload : Product}>(),
    createProductSuccess: props<{payload : Product}>(),
    createProductError: props<{payload: string}>()
  }
})

/*
export enum ProductsActionTypes {
  GET_ALL_PRODUCTS = '[Products] Get All products',
  GET_ALL_PRODUCTS_SUCCESS = '[Products] Get All products success',
  GET_ALL_PRODUCTS_ERROR = '[Products] Get All products failure',
}


export class GetAllProductsAction implements Action {
  readonly type: ProductsActionTypes = ProductsActionTypes.GET_ALL_PRODUCTS;
  constructor(public payload: any) {}
}
export class GetAllProductsSuccess implements Action {
  readonly type: ProductsActionTypes =
    ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}
export class GetAllProductsError implements Action {
  readonly type: ProductsActionTypes =
    ProductsActionTypes.GET_ALL_PRODUCTS_ERROR;
  constructor(public payload: string) {}
}

export type ProductsActions =
  | GetAllProductsAction
  | GetAllProductsSuccess
  | GetAllProductsError;
*/

// second approach is to use createActionGroup to define a group of related actions 
// the type of the action is automatically generated based on the source and events keys. 
// The props function specifies the payload shape.



