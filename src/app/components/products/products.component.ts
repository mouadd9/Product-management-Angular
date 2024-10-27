import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { Observable, startWith, map, catchError, of, tap } from 'rxjs';
import { AppDataState, DataStateEnum } from '../../state/product.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {

  DataStateEnum = DataStateEnum;
  products$ : Observable<AppDataState<Product[]>> | null = null; // here products$ will hold an Observable that emits the DataState 
  productName = new FormControl('');
  constructor(private productService : ProductsService){
    
  }
 
  getAllProducts(){
    // here we will uses our service to get the observable that emits the array of products 
    // then we will use the RxJS pipe() to operate on the Observable 
    // the first operation is map 
    // we will use map() to transform the Observable 
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$  = this.productService.getAllProducts().pipe(
      
      map( data => ({  
        dataState: DataStateEnum.LOADED,  // here we set the data state to LOADED
        data: data  // here we store the data 
      })), 
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
      }))
    );
  }

  getSelectedProducts(){
    // here we will uses our service to get the observable that emits the array of products 
    // then we will use the RxJS pipe() to operate on the Observable 
    // the first operation is map 
    // we will use map() to transform the Observable 
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$  = this.productService.getSelectedProducts().pipe(
      
      map( data => ({  
        dataState: DataStateEnum.LOADED,  // here we set the data state to LOADED
        data: data  // here we store the data 
      })), 
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
      }))
    );
  }
  
  getAvailableProducts(){
    // here we will uses our service to get the observable that emits the array of products 
    // then we will use the RxJS pipe() to operate on the Observable 
    // the first operation is map 
    // we will use map() to transform the Observable 
    // the initial Observable emits an array Products[]
    // map will return a new observable of type AppDataState<Product[]> the new data emitted containes the state of the data , data and an error message

    this.products$  = this.productService.getAvailableProducts().pipe(
      
      map( data => ({  
        dataState: DataStateEnum.LOADED,  // here we set the data state to LOADED
        data: data  // here we store the data 
      })), 
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
      }))
    );
  }

  onSubmit() {
    this.products$  = this.productService.searchProduct(this.productName.value).pipe(
      tap(
        data => {
          console.log('Data from search:', data);
        }
      ),
      
      map( data => ({  
        dataState: DataStateEnum.LOADED,  // here we set the data state to LOADED
        data: data  // here we store the data 
      })), 
      startWith({dataState: DataStateEnum.LOADING}),
      catchError( err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
      }))
    );
   
  }

  OnSelect(p: Product) {
    // so here we need to update the product in db.json with a new product
    
    this.productService.select(p).subscribe(
      {
        next : data => {
          p.selected = data.selected;
          console.log(data);
        }
      }
    )
    }

    OnDelete(p:Product){
      this.productService.deleteProduct(p).subscribe({
        next : data=> {
          this.getAllProducts();

        }
      })
  

    }

}
