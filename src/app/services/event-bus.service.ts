import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActionEvent } from '../state/product.state';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  constructor() { }

  // here we declare a subject that emits events of type ActionEvent
  private eventSubject: Subject<ActionEvent> = new Subject<ActionEvent>();

  // in order for other components to subscribe to the event stream to get notified when new events are published by a publisher
  // we expose our subject as Observable 
  // we use $ to signal that this is an observable, and then we use "event" to signal that the subscriber will listen for events
  public event$: Observable<ActionEvent> = this.eventSubject.asObservable();
  
  // this method is used by Components that publish events,it allows them to push/publish/emit new events to the subject's events stream 
  // so what happens is when a component calls this method it passes the event as argument
  // the method doesnt return anything
  publishEvent(event : ActionEvent ): void {
    // here we will use the .next() method to push events into the event stream managedby the subject
    this.eventSubject.next(event);
  }
}

// who will use this service 
// ProductComponent : 
// the component product is the one responsible for communicating with the backend
// so this component should observe events coming from other components via the EventBus and react to them
// steps
// Inject the EventBusService into the smart component's constructor.
// Subscribe to the event stream (usually an Observable like event$) within the component, typically in ngOnInit.
// Route each event to its respective method based on the event type or data content.


// this servoce will be injected into the components that will publish events
// product nav bar , published events for fetching data : - get all products - get selected products - get available products - search
