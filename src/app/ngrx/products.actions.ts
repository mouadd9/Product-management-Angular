import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../models/product.model';


export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    getAllProducts : emptyProps(),
    getAllProductsSuccess : props<{payload : Product[]}>(),
    getAllProductsError : props<{payload : string}>(), 
    getSelectedProducts : emptyProps(),
    getSelectedProductsSuccess : props<{payload : Product[]}>(),
    getSelectedProductsError : props<{payload : string}>() 
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



