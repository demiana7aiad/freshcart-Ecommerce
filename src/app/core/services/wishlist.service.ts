import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  removeCartItem(id: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private _HttpClient:HttpClient ) {} 

  baseUrl:string = `https://ecommerce.routemisr.com/api/v1/`

  addToWishlist(prodId:string|undefined):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'wishlist' ,
    {
      productId: prodId
    }
    )
  }
  getWishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'wishlist' ,
    
    )
  }

  
  removeWishlist(prodId:string|undefined):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`,
   
     )
   }

}
