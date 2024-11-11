import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import {
  Observable,
  startWith,
  map,
  catchError,
  of,
  tap,
  Subscription,
} from 'rxjs';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionsType,
} from '../../state/product.state';
import { RouterModule } from '@angular/router';
import { ProductsNavBarComponent } from './products-nav-bar/products-nav-bar.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ProductsNavBarComponent,
    ProductsListComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
// This component will be responsible for calling the service and storing the observable.
export class ProductsComponent implements OnInit {
  private eventSubscription!: Subscription;
  products$: Observable<AppDataState<Product[]>> | null = null; // here products$ will hold an Observable that emits the DataState

  constructor(
    private productService: ProductsService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.eventSubscription = this.eventBusService.event$.subscribe(
      (event: ActionEvent) => {
        this.eventRouter(event);
      }
    );
  }

  getAllProducts() {
    // here we will uses our service to get the observable that emits the array of products
    // then we will use the RxJS pipe() to operate on the Observable
    // the first operation is map
    // we will use map() to transform the Observable
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$ = this.productService.getAllProducts().pipe(
      map((data) => ({
        dataState: DataStateEnum.LOADED, // here we set the data state to LOADED
        data: data, // here we store the data
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  getSelectedProducts() {
    // here we will uses our service to get the observable that emits the array of products
    // then we will use the RxJS pipe() to operate on the Observable
    // the first operation is map
    // we will use map() to transform the Observable
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$ = this.productService.getSelectedProducts().pipe(
      map((data) => ({
        dataState: DataStateEnum.LOADED, // here we set the data state to LOADED
        data: data, // here we store the data
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  getAvailableProducts() {
    // here we will uses our service to get the observable that emits the array of products
    // then we will use the RxJS pipe() to operate on the Observable
    // the first operation is map
    // we will use map() to transform the Observable
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$ = this.productService.getAvailableProducts().pipe(
      map((data) => ({
        dataState: DataStateEnum.LOADED, // here we set the data state to LOADED
        data: data, // here we store the data
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  onSubmit(keyword: any) {
    this.products$ = this.productService.searchProduct(keyword).pipe(
      tap((data) => {
        console.log('Data from search:', data);
      }),

      map((data) => ({
        dataState: DataStateEnum.LOADED, // here we set the data state to LOADED
        data: data, // here we store the data
      })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message,
        })
      )
    );
  }

  OnSelect(p: Product) {
    // so here we need to update the product in db.json with a new product

    this.productService.select(p).subscribe({
      next: (data) => {
        p.selected = data.selected;
        console.log(data);
      },
    });
  }

  OnDelete(p: Product) {
    this.productService.deleteProduct(p).subscribe({
      next: (data) => {
        this.getAllProducts();
      },
    });
  }

  // this method subscribes to the observable in the EventBusService and listens for incoming events and then routes to an appropiate method
  eventRouter(event: ActionEvent) {
    switch (event.type) {
      case ProductActionsType.GET_ALL_PRODUCTS:
        this.getAllProducts();

        break;
      case ProductActionsType.GET_AVAILABLE_PRODUCTS:
        this.getAvailableProducts();

        break;
      case ProductActionsType.GET_SELECTED_PRODUCTS:
        this.getSelectedProducts();

        break;
      case ProductActionsType.SEARCH_PRODUCTS:
        this.onSubmit(event.payload);

        break;
      case ProductActionsType.DELETE_PRODUCT:
        this.OnDelete(event.payload);

        break;
      case ProductActionsType.SELECT_PRODUCT:
        this.OnSelect(event.payload);

        break;
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
