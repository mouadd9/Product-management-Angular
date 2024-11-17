

/*
The root bootstrap configuration in main.ts tells Angular 
how to start the application and provides any global settings it needs,
such as routing, state management, or other services.
It’s the equivalent of setting up AppModule 
in the traditional Angular approach, but with standalone components,
this setup is done directly in main.ts using bootstrapApplication.

*/


import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { productsReducer } from './ngrx/products.reducers';
import { ProductsEffects } from './ngrx/products.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    // here we map the slice of our state with its reducer (provider)
    // products is an Observable offered by the store that wrappes around a stream of "ProductsState" sent by the reducer

    provideStore({ products: productsReducer }), 
    provideEffects([ProductsEffects]), // Effects
    provideStoreDevtools({}),
  ],
};

/*
By using provideStore, you integrate productsReducer into the global store.
Any changes triggered by dispatched actions flow through the productsReducer,
updating the state slice products and emitting the updated state as a stream.
*/