import { bootstrapApplication } from '@angular/platform-browser'; // Imports the `bootstrapApplication` function, which is used to initialize (or "bootstrap") the Angular application.

import { appConfig } from './app/app.config';// Imports `appConfig`, which contains the application’s configuration settings (like routes, providers, etc.).

import { AppComponent } from './app/app.component';// Imports the root component (`AppComponent`). This is the starting component of the application, which contains the component tree.

import { enableProdMode } from '@angular/core';// Imports `enableProdMode`, a function that enables production mode for the Angular app, which disables debugging information to improve performance.

enableProdMode(); // Activates production mode to enhance performance by disabling Angular’s development mode checks.
bootstrapApplication(AppComponent, appConfig)
// Bootstraps the application with `AppComponent` as the root component and `appConfig` as the configuration for the app.
// `AppComponent` serves as the entry point, while `appConfig` defines global settings (e.g., routing, services).
  .catch((err) => console.error(err));
// Catches and logs any errors that might occur during the application bootstrapping process.
