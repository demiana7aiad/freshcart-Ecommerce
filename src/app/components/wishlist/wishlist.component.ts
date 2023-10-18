import { Product } from './../../core/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

 constructor(private _WishlistService:WishlistService , private _Renderer2:Renderer2 , private _ToastrService:ToastrService , private _CartService:CartService){
 }


 wishListData:string[]=[];
 wishlist:any=null;
 products:Product[] = [];

ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.products=response.data;
      }
    })
}


  addProduct(id:any , element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element, 'hidden', 'true')
     this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success( 'It has been successfully added' );
        this._CartService.cartNumber.next(response.numOfCartItems);
        this._Renderer2.removeAttribute(element, 'hidden' );
       

      }

    })
  }

  removeWishlist(prodId:string|undefined):void{
    this._WishlistService.removeWishlist(prodId).subscribe({
     next:(response)=>{
         this._ToastrService.success('It has been successfully removed ')
         this.wishListData= response.data;
         const newData= this.products.filter((item:any)=>this.wishListData.includes(item._id))
         this.products=newData;
     },
    });
   }
  }