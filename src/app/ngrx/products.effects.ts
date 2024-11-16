// here we will define effects that will react to special actions that require API calls
// this will be a class , an injectable , we will inject into it an Actions observable that will help us access the actions stream 
// in order to react to certain actions 
// and we will inject the service that returns Observables that listens to the responses from the backend 

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../services/products.service";
import { catchError, map, mergeMap, Observable, of } from "rxjs";
import { GetAllProductsError, GetAllProductsSuccess, ProductsActionTypes } from "./products.actions";
import { Action } from "@ngrx/store";

@Injectable()
export class ProductsEffects {
    // we use private to automatically declare and initialize actions$ and to make it accessible within the class
    constructor(private actions$ : Actions , private productsService : ProductsService){}

    // next step is to create an Effect that : 
    // listens to specific actions
    // callsthe products service to fetch data 
    // dispatches an action based on the response 

    // by convention an effect has the same name as the action it responds to 
    // and an effect is an Observable of type Action , meaning the dispatched action (success or failure)

    getAllProductsEffect$ : Observable<Action> = createEffect(() => 

        this.actions$.pipe( // we use pipe to go through the events (actions) that are emitted to the stream
            ofType(ProductsActionTypes.GET_ALL_PRODUCTS), // when we find an event or action of this type
            mergeMap( () => {
               return this.productsService.getAllProducts().pipe(
                        map(products => new GetAllProductsSuccess(products) ),
                        catchError((err) => of(new GetAllProductsError(err.message)) )
                )
            })
            
        )
        
    );
}