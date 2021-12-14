import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { User } from 'src/model/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  confPass:string;

  constructor(private logService:LoginService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router) {
     
     }

  ngOnInit(): void {
  }

  register():void{
    this.spinner.show();
    this.logService.userRegister(this.user).subscribe((data)=>{
      let message = data.Message;
      this.toastr.success(message,'Alert');
      this.spinner.hide();
      if(message == 'Registration successful')
        this.router.navigate(['login']);
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

}
