import { Product } from 'src/app/core/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,
    private _ProductService:ProductService,
    private _Renderer2:Renderer2,
    private _CartService:CartService ,
    private _ToastrService:ToastrService,
    ){}

  ProductId! :string|null;
  productDetails:any=null;
  products:Product[] = [];
  
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
         this.ProductId= params.get('id');

        }
      });
 
      this._ProductService.getproductDetails(this.ProductId).subscribe({
        next:(  {data}  )=>{
        this.productDetails=data;
        },
       });

    
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

    productDetailsOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
     items:1,
      nav: true
    }

  
  
}
