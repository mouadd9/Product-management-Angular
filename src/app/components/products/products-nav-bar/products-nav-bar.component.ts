import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActionEvent, ProductActionsType } from '../../../state/product.state';
import { RouterModule } from '@angular/router';
import { EventBusService } from '../../../services/event-bus.service';

@Component({
  selector: 'app-products-nav-bar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './products-nav-bar.component.html',
  styleUrl: './products-nav-bar.component.css'
})
export class ProductsNavBarComponent {

  constructor(private eventBusService: EventBusService){}
  productName = new FormControl('');
  
  //@Output() eventEmitter: EventEmitter<ActionEvent> =new EventEmitter<ActionEvent>(); // this is an event emitter , we will use it to send events to the parent component
  // we will send a message of type ActionEvent to specify what we want to do and the payload
  // now we need to listen to the events emitted by this event emitter in the parent component template using the (messageEvent)

onSubmit() {
  // here we will send the submitted payload to the parent component
  //this.eventEmitter.emit({type:ProductActionsType.SEARCH_PRODUCTS, payload:this.productName.value});
   
  this.eventBusService.publishEvent({type:ProductActionsType.SEARCH_PRODUCTS, payload:this.productName.value});

}
getSelectedProducts() {
// here we will send an eventAction of type get selected
// this.eventEmitter.emit({type:ProductActionsType.GET_SELECTED_PRODUCTS,payload:null});
this.eventBusService.publishEvent({type:ProductActionsType.GET_SELECTED_PRODUCTS,payload:null});
}
getAllProducts() {
// here we will send an eventAction of type get all
// this.eventEmitter.emit({type:ProductActionsType.GET_ALL_PRODUCTS, payload:null});
this.eventBusService.publishEvent({type:ProductActionsType.GET_ALL_PRODUCTS,payload:null});

}
getAvailableProducts() {
// here we will send an eventAction of type get available
// this.eventEmitter.emit({type:ProductActionsType.GET_AVAILABLE_PRODUCTS, payload:null});
this.eventBusService.publishEvent({type:ProductActionsType.GET_AVAILABLE_PRODUCTS,payload:null});
}




}
