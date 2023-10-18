import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
constructor(private _CartService:CartService){}
cartDetails:any=null;


    ngOnInit(): void {
        this._CartService.getCartUser().subscribe({
          next:(response)=>{
            console.log(response.data);
            this.cartDetails=response.data;
          },

        });
    }

    removeItem(id:string):void{
      this._CartService.removeCartItem(id).subscribe({
      next:(response)=>{
         this.cartDetails=response.data;
         this._CartService.cartNumber.next(response.numOfCartItems);
      },

      });
    }

    changeCount(count:number , id:string):void{
      if(count>=1){

        this._CartService.updateCartCount(id , count).subscribe({
          next:(response)=>{
           this.cartDetails=response.data;
          },
       });

      }
    }

    clear():void{
      this._CartService.clearCart().subscribe({
        next:(response)=>{
          if(response.message==="success"){
            this.cartDetails=null;
            this._CartService.cartNumber.next(0);
          }
          
        },
      });
    }
}

