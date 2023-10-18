import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Brands } from 'src/app/core/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _ProductService:ProductService, private _ToastrService:ToastrService,
    private _Renderer2:Renderer2){}

    brands:Brands[] = [];

  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next : (response) =>{
       console.log(response.data);
       this.brands = response.data;
       
      },
       });
  }

}
