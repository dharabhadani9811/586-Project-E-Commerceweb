import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()  
export class JwtInterceptor implements HttpInterceptor{
    constructor(private router : Router){
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        console.log("Intercept method called from JWTInterceptor..");  
        // add authorization header with jwt token if available  
        console.log(localStorage.getItem('Token'));
        let token = sessionStorage.getItem('Token')

        
        console.log(token);
            request = request.clone({  
                setHeaders: {  
                    Authorization: `Bearer ${token}`
                }  
            });  
        
            return next.handle(request)
            .pipe(catchError((err: any) => {
                console.log('this log isn');
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        //console.log('Unauthorized');
                        this.router.navigate(['login']);
                    }
                }
        
              return new Observable<HttpEvent<any>>();
            }));
    }  
}