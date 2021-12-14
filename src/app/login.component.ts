import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/model/login.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ResponseLogin } from 'src/model/ResponseLogin.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string = '';
  password:string;
  type:string;
  response:ResponseLogin = new ResponseLogin();


  constructor(private logService:LoginService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private dialog:MatDialog) {
     
     }

  ngOnInit(): void {
  }

  login():void{
    //this.router.navigate(['/master']);
    if (this.type == "1")
      this.adminLogin();
    else if (this.type == "2")
      this.userLogin();
    

    // this.logService.userLogin(this.email,this.password,this.type).subscribe((data)=>{
    //     this.response = data as Login|string;
    //     if(this.response.emp_id != null){
    //         let emp_id = this.response.emp_id;
    //         sessionStorage.setItem("emp_id",emp_id);
    //         this.toastr.success(this.response.message,'Alert');
    //         this.router.navigate(['/user']);
    //     }
    //     else
    //     { 
    //         let msg = this.response;
    //         if(msg == "Login successful")
    //         {
    //           this.toastr.success(msg,'Alert');
    //           sessionStorage.setItem("username","admin");
    //           this.router.navigate(['/master']);
    //         }
    //         else
    //           this.toastr.warning(msg,'Alert');
    //     }  
    //     this.spinner.hide();   
    // },(err)=>{
    //     this.toastr.error(err,'Alert'),
    //     this.spinner.hide();
    // });
  }

  adminLogin():void{
    this.spinner.show();
    this.logService.adminLogin(this.email,this.password).subscribe((data) =>{
      this.response = data as ResponseLogin;
      let message = this.response.Message;
      if(message == 'Login successful'){
        this.toastr.success(message,'Alert');
        sessionStorage.setItem('UserID',this.response.UserID);
        sessionStorage.setItem('EmailID',this.response.EmailID);
        sessionStorage.setItem('Token',this.response.Token);
        this.router.navigate(['/master']);
      }
      else{
        this.toastr.error(message,'Alert');
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

  userLogin():void{
    this.spinner.show();
    this.logService.userLogin(this.email,this.password).subscribe((data) =>{
      this.response = data as ResponseLogin;
      let message = this.response.Message;
      if(message == 'Login successful'){
        this.toastr.success(message,'Alert');
        sessionStorage.setItem('UserID',this.response.UserID);
        sessionStorage.setItem('EmailID',this.response.EmailID);
        sessionStorage.setItem('Token',this.response.Token);
        this.router.navigate(['/user']);
      }
      else{
        this.toastr.error(message,'Alert');
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }


  forgot():void{
    if(this.email.length == 0){
      this.toastr.error('Please enter email id','Alert');
    }
      else{
        this.spinner.show();
        this.logService.forgotPassword(this.email).subscribe((data)=>{
          let message = data.Message;
          if(message == 'Please check your email'){
            this.toastr.success(message,'Alert');
            this.spinner.hide();
          }
          else{
            this.toastr.error(message,'Alert');
            this.spinner.hide();
          }
        },(err)=>{
          this.toastr.error(err,'Alert');
          this.spinner.hide();
        });
    }
  }


}
