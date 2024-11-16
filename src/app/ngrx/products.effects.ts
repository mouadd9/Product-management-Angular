import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../services/products.service";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { ProductsActions } from "./products.actions";
import { Action } from "@ngrx/store";

@Injectable()
export class ProductsEffects {
  // this constructor runs and initializes the actions$ property after all properties are intialized 
  getAllProductsEffect$ : Observable<Action>;
  constructor(
    private actions$: Actions, // Observable stream of all actions dispatched
    private productsService: ProductsService // Service to fetch products data
  ) {
     this.getAllProductsEffect$ =
     createEffect(() =>
      this.actions$.pipe(
        ofType(ProductsActions.getAllProducts),
        mergeMap((action) => {
          return this.productsService.getAllProducts().pipe(
            map(products =>
              ProductsActions.getAllProductsSuccess({ payload: products })
            ),
            catchError((err) =>
              of(ProductsActions.getAllProductsError({ payload: err.message }))
            )
          );
        })
      )
    );
   
  }

  
}
