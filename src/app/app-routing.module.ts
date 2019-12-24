import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {path:'products/:url', component:ProductsComponent},
  {path:'login', component:LoginComponent},
  {path:'adminCategories', component:AdminCategoriesComponent},
  {path:'adminProducts', component:AdminProductsComponent},
  {path:'adminUsers', component:AdminUsersComponent},
  {path:'register', component:RegisterComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
