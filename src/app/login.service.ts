import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/model/login.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from 'src/model/employee';
import { User } from 'src/model/User.model';
import { ResponseMessage } from 'src/model/ResponseMessage.model';
import { ResponseLogin } from 'src/model/ResponseLogin.model';

@Injectable()
export class LoginService{

    //url='http://localhost/api_management/api/login/';
    url='https://e-commerceapi.azurewebsites.net/api/';
    imageUrl = 'https://e-commerceapi.azurewebsites.net/';
 
    constructor(private http:HttpClient){

    }

    adminLogin(username:string,password:string):Observable<ResponseLogin>{
        return this.http.get<ResponseLogin>(this.url+"admin/login/"+username+"/"+password).
        pipe(catchError(this.handleError));
    }

    userLogin(email:string,password:string):Observable<ResponseLogin>{
        return this.http.get<ResponseLogin>(this.url+"user/login/"+email+"/"+password).
        pipe(catchError(this.handleError));
    }

    userRegister(user:User):Observable<ResponseMessage>{
        return this.http.post<ResponseMessage>(this.url+"/user/register",user).pipe(catchError(this.handleError));
    }

    forgotPassword(email:string):Observable<ResponseMessage>{
        return this.http.get<ResponseMessage>(this.url+"user/forgotPassword/"+email+"/")
        .pipe(catchError(this.handleError));
    }

   


    private handleError(errorResponse : HttpErrorResponse)
    {
       if(errorResponse.error instanceof ErrorEvent)
       {
          // console.log("Client side Error: ",errorResponse.error.message);
       }
       else
       {
           //console.error("Server Side Error: ",errorResponse.error.message);
       }
       return throwError("There is a problem with the service.We are notified & working on it.Please try again later");
   }
}