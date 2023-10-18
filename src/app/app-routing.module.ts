import { CategorydetailsComponent } from './components/categorydetails/categorydetails.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  //blank
  {path:'' ,
  canActivate : [authGuard],
  loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
children: [
  {path:'' , redirectTo: 'home' , pathMatch:'full'},
  {path: 'home' , loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent), title: 'Home component'},
  {path: 'cart' , loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent), title: 'Cart component'},
  {path: 'wishlist' , loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent), title: 'Wish list component'},
  {path: 'products' , loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent), title: 'Productscomponent '},
  {path: 'productdetails/:id' , loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent), title: 'Productdetails component '},
  {path: 'categories' , loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent), title: 'Categories component'},
  {path: 'categorydetails/:id' , loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent), title: 'Category Details component'},
  {path: 'brands' , loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent), title: 'Brands component'},
  {path: 'payment/:id' , loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent), title: 'paymentcomponent '},
  ]
},
//auth
{path:'' , loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
children:[
  {path:'' , redirectTo: 'login' , pathMatch:'full'},
  {path:'login' , loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent), title:'Login'},
  {path:'register' , loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent), title:'Register'},
  {path: 'forgetpassword' , loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent), title: 'forget-password'},

]



},

//not found
{path:'**' , loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent),title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
