import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ActionEvent, ProductActionsType } from '../../../../state/product.state';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html', 
  styleUrl: './product-item.component.css',
  encapsulation: ViewEncapsulation.None  // Disable view encapsulation
})
export class ProductItemComponent {

  // now we need an input ta access the data we need , so for each product we need to pass the product 
  @Input() product!: Product;
  // here we will send events to the parent component
  @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();



  OnSelect(product: Product) {
    // here we will emit an action that has a type of select and a payload containing the product
    this.eventEmitter.emit({type:ProductActionsType.SELECT_PRODUCT, payload: product});
    }
    OnDelete(product: Product) {
    // here we will emit an event that has a type of delete and a payload containing the product to delete
    this.eventEmitter.emit({type:ProductActionsType.DELETE_PRODUCT, payload: product});
    }
}
