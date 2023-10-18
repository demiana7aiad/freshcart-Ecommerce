import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient ) {} 

   baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`


   getProducts():Observable<any>{
     return this._HttpClient.get(this.baseUrl + 'products')
   }

   getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'categories')
  }

  getSubCategories(id:string|null):Observable<any>{
    return this._HttpClient.get(`https://route-ecommerce.onrender.com//api/v1/subcategories`)
  }

   getproductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `products/${id}`);
  }

  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'brands')
  }
}
