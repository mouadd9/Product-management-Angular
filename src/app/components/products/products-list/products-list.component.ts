import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import {
  AppDataState,
  DataStateEnum,
} from '../../../state/product.state';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  // so this is a child component that will get data from the parent component
  // we will get an array of products
  readonly DataStateEnum = DataStateEnum;
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null; // here products$ will hold an Observable that emits the DataState

  // now to emit data to the parent component we use the eventEmitter

  //@Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

 /* receiveEvent($event: ActionEvent) {
    this.eventEmitter.emit($event);
  } */
 // this serves nothing now the event is not published using angular'e event emitter 
 // and this component now only subscribes to the product observable
}
