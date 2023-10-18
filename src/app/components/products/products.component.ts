import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule ,RouterLink , CuttextPipe ,SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
 

  constructor(private _ProductService:ProductService ,
    private _CartService:CartService , 
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ){}

  products:Product[] = [];
  term:string='';
  wishListData:string[]=[];

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
     next : (response) =>{
      console.log(response.data);
      this.products = response.data;
      
     },
      });

      this._WishlistService.getWishlist().subscribe({
        next:(response)=>{
         const newData= response.data.map((item:any)=>item._id);
         this.wishListData= newData
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
         
  
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(element, 'hidden' );
        }
       });
    }

    
  addWishlist(prodId:string|undefined):void{
    this._WishlistService.addToWishlist(prodId).subscribe({
     next:(response)=>{
         this._ToastrService.success('It has been successfully added ')
         this.wishListData=response.data;
     }
    })
   }

   removeWishlist(prodId:string|undefined):void{
    this._WishlistService.removeWishlist(prodId).subscribe({
     next:(response)=>{
         this._ToastrService.success('It has been successfully removed ')
         this.wishListData=response.data;
     }
    })
   }

}
