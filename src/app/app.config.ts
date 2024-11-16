import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { productsReducer } from './ngrx/products.reducers';
import { ProductsEffects } from './ngrx/products.effects';

/*
The root bootstrap configuration in main.ts tells Angular 
how to start the application and provides any global settings it needs,
such as routing, state management, or other services.
It’s the equivalent of setting up AppModule 
in the traditional Angular approach, but with standalone components,
this setup is done directly in main.ts using bootstrapApplication.

*/


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore({products : productsReducer}), // here we should specify the reducers
    provideEffects([ProductsEffects]), // here we should add an array of effects
    provideStoreDevtools({})
  ],
  
};
