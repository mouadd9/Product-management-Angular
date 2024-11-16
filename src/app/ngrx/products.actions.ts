// here we will define actions

import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

// we will first define the types of actions related to the products feature
// then we will create classes for each action
// each class will serve as the factory for for objects (Actions) that will be dispatched
// then we will export a union type that will group all actions in one type

// now we will define an enum called ActionTypes
export enum ProductsActionTypes {
  // get all products is an action dispatched by a component who needs all products
  GET_ALL_PRODUCTS = '[Products] Get All products',
  // get all products success is an action dispatched by effects following an API response
  GET_ALL_PRODUCTS_SUCCESS = '[Products] Get All products success',
  // get all products error is an action dispatched by effects following an API response
  GET_ALL_PRODUCTS_ERROR = '[Products] Get All products failure',
}

// for each type we will create a class that will construct objects consummed by a reducer
// for each class we will define the type of the action
// then the payload
// we will use the constructor to pass the payload because it is passed while creating the object

export class GetAllProductsAction implements Action {
  readonly type: ProductsActionTypes = ProductsActionTypes.GET_ALL_PRODUCTS;
  constructor(public payload: Product[]) {}
}
export class GetAllProductsSuccess implements Action {
  readonly type: ProductsActionTypes =
    ProductsActionTypes.GET_ALL_PRODUCTS_SUCCESS;
  constructor(public payload: any) {}
  // now imagine an action dispatched when the API call that gets all products returns an OK status
  // we will get a response in the body of the request
  // when creating the action GET_ALL_PRODUCTS_SUCCESS we should add it to the payload
}
export class GetAllProductsError implements Action {
  readonly type: ProductsActionTypes =
    ProductsActionTypes.GET_ALL_PRODUCTS_ERROR;
  constructor(public payload: string) {}
  // here when an error is returned by the backend we should add it to the action object as an error message string
}

// now we should export a type that we will use when creating an object representing each Action related to this specific feature
// we will use this type later 
export type ProductsActions =
  | GetAllProductsAction
  | GetAllProductsSuccess
  | GetAllProductsError;

