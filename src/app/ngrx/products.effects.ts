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

  // here we decalre a property of type Observable , not initialized yet
  deleteProduct$: Observable<Action>; // observable of type Action used by the store to dispatch each actions one by one


  // we create a new effect property , that will be an Observable of type Action
  // this observable is accessed by the store , in order to dispatch all actions emitted by this observable
  selectProduct$: Observable<Action>; // ideally we should send an API request and map the reponse as action object
  // the issue here , when should we send an API request ? 
  // when an action of type select Product is dipatched 
  // how do we know ? 
  // we inject an observable that wraps around the event stream of all actions dispatched
  // for each action of the desired type we send an api request , and we flatten all the observables returned into one observable of type Action 
  searchProduct$ : Observable<Action>;
  createProduct$ : Observable<Action>;
  newProduct$ : Observable<Action>;
  constructor(
    private actions$: Actions, // here we inject the Observable stream of all actions dispatched
    private productsService: ProductsService // here we inject the Products Service 
  ) {

    // here we will intiliaze all properties , so that when an instance is created by Angular , we first inject the dependencies

    // this effect property will responde to each action dispatched of type getAllProducts
    // this property is of type Observable<Action> and the store uses this property to dispatched all actions streamed through this observable
    // we will observe all dispatched actions, when we encounter an action of type (ofType) getAllProducts, we will use mergeMap
    // mergeMap will take in data from a stream of data and then for each valuer of a stream , it will return an onservable 
    // all observable returned will be flattened to be on observable 
    this.getAllProductsEffect$ = createEffect(() =>
      this.actions$.pipe( // here we use pipe to use operators and transform data 
        ofType(ProductsActions.getAllProducts), // we only take in values of this type
        mergeMap((action) => { // we use merge map to create a new stream of data that has the API call responses for all the actions
          return this.productsService.getAllProducts().pipe(
            map((products) => { // here we use map and then pass the products returned by the API to an action creater 
              return ProductsActions.getAllProductsSuccess({
                payload: products,
              }); // now we created an action and we will send it to the new stream of data
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

    // createEffect is a function that takes in nothing as argument
    this.deleteProduct$ = createEffect(() =>
      // here we will use the stream of actions
      this.actions$.pipe(
        ofType(ProductsActions.deleteProduct),
        mergeMap((action) => {  // merge Map should return an Observable for each value (action) taken in 
          console.log("EFFECTS : just caught the dispatched action" + action.type + "by the component" );
          return this.productsService.deleteProduct(action.payload).pipe(
            map(
              () => {
                console.log("EFFECTS : returning success action to be dispatched");
                return ProductsActions.deleteProductSuccess({payload : action.payload.id});
              }
            ),
            catchError((err) => of(ProductsActions.deleteProductError({payload : err.message})) )
          )
        })
      )
    )

    // here we will use the constructor the initiate the property 
    // we use createEffect so that the observable returned will be used by the store
    // create effect is a class back function, that takes in no argument and returns an Observable 
    this.selectProduct$ = createEffect(() => 

      // this is the observable that will emit a stream of all actions dispatched 
      // we use pipe() , to operate over the stream of events 
      // pipe() gives us the capacity to modify the stream by returning a new observable
    this.actions$.pipe(
      // first we should ofType to only operate on specific Actions
      ofType(ProductsActions.selectProduct), // so the stream is now limited only to actions of this type 
      //so next what we want is that for each action we want to do an api call , then format the response in an Action format 
      // then for each response we want to merge all obervables into one obervable
      mergeMap((action) => {
        // do for each action we should return an observable of type <Action> that has actions with type and payload
        return this.productsService.select(action.payload).pipe( // this service will either return an error or void 
          map ((product) => ProductsActions.selectProductSuccess({payload : product }))// if the select works we return the updated object
          ,catchError((err) => of(ProductsActions.selectProductError({payload : err.message})))
        )

      })
    )
  
  )

  this.searchProduct$ = createEffect(()=>
  this.actions$.pipe(
    ofType(ProductsActions.searchProduct),
    mergeMap((action) => {
      return this.productsService.searchProduct(action.payload).pipe(
        map((products) => {
          console.log(products);
          return ProductsActions.searchProductSuccess({payload : products})}),
        catchError((err) => of(ProductsActions.searchProductError({payload: err.message})))
      )
    })
  ))

  this.createProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductsActions.createProduct),
      mergeMap((action) => {
        return this.productsService.createProduct(action.payload).pipe(
          map((product) => ProductsActions.createProductSuccess({payload : product})),
          catchError((err) => of(ProductsActions.createProductError({payload: err.message})))
        )
      })
    ))

    this.newProduct$ = createEffect(()=>
      this.actions$.pipe(
        ofType(ProductsActions.newProduct), // normally after this we take in the payload and return a success action with tha data to populate the form
        map(() => ProductsActions.newProductSuccess() )
      ))
  }

  
  
}
