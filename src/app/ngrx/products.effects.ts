import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../services/products.service';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { ProductsActions } from './products.actions';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductsEffects {
  // this constructor runs and initializes the actions$ property after all properties are intialized
  getAllProductsEffect$: Observable<Action>;

  // we should another property that will be used to dispatch actions to the store (automatically)
  // whenever we find an action of type getSelectedProducts , we will send an API call and then emit Actions to an observable of type action that will be used by the store to dispatch those actions
  getSelectedProductsEffect$: Observable<Action>;
  constructor(
    private actions$: Actions, // Observable stream of all actions dispatched
    private productsService: ProductsService // Service to fetch products data
  ) {
    this.getAllProductsEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.getAllProducts),
        mergeMap((action) => {
          return this.productsService.getAllProducts().pipe(
            map((products) => {
              return ProductsActions.getAllProductsSuccess({
                payload: products,
              });
            }),
            catchError((err) =>
              of(ProductsActions.getAllProductsError({ payload: err.message }))
            )
          );
        })
      )
    );

    this.getSelectedProductsEffect$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.getSelectedProducts),
        mergeMap(() => {
          return this.productsService.getSelectedProducts().pipe(
            map((products) =>
              ProductsActions.getSelectedProductsSuccess({ payload: products })
            ),
            catchError((err) =>
              of(
                ProductsActions.getSelectedProductsError({
                  payload: err.message,
                })
              )
            )
          );
        })
      )
    );
  }
}
