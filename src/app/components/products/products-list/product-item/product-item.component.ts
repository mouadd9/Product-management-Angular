import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Product } from '../../../../models/product.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
  encapsulation: ViewEncapsulation.None, // Disable view encapsulation
})
export class ProductItemComponent {
  constructor() {}

  // now we need an input ta access the data we need , so for each product we need to pass the product
  @Input() product!: Product;
  // here we will send events to the parent component
  // @Output() eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  OnSelect(product: Product) {
   
  }
  OnDelete(product: Product) {
    
  }
}
