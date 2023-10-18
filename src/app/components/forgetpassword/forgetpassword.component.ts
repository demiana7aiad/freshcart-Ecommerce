import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForgetpassService } from 'src/app/core/services/forgetpass.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule ,RouterLink ,RouterLinkActive,ReactiveFormsModule ],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

  constructor(private _ForgetpassService:ForgetpassService , private _Router:Router){}

  step1:boolean =true;
  step2:boolean =false;
  step3:boolean =false;
  email:string='';
  userMsg:string='';
 

  forgetForm:FormGroup =new FormGroup({
    email: new FormControl('')
  })

  resetCodeForm:FormGroup =new FormGroup({
    resetCode: new FormControl('')
   })

   resetPasswordForm:FormGroup =new FormGroup({
    email: new FormControl(''),
    newPassword: new FormControl('')
  })


  forgetPassword():void{
    let userEmail = this.forgetForm.value;
    this.email= userEmail.email;
    this._ForgetpassService.forgetPassword(userEmail).subscribe({
      next:(response)=>{
        this.userMsg= response.message;
        this.step1=false;
        this.step2=true;
      },
      error:(err)=>{
        this.userMsg= err.error.message;
        
      },
    });
  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgetpassService.resetCode(resetCode).subscribe({
      next:(response)=>{
        this.userMsg= response.status;
        this.step2=false;
        this.step3=true;
      },
      error:(err)=>{
        this.userMsg= err.error.message;
        
      },
    });
  }

  resetPassword():void{
    let resetForm= this.resetPasswordForm.value;
    resetForm.email=this.email;
    this._ForgetpassService.resetPassword(resetForm ).subscribe({
      next:(response)=>{
      if(response.token){
          localStorage.setItem('etoken' , response.token);
          this._Router.navigate(['/home']);
      }
      },
      error:(err)=>{
        this.userMsg= err.error.message;
        
      },
    });
  }



}
