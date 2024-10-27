import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ProductformComponent } from './components/productform/productform.component';


export const routes: Routes = [
    { path:'products', component:ProductsComponent },
    { path:'home', component:HomeComponent},
    { path:'form', component:ProductformComponent},
    
];
