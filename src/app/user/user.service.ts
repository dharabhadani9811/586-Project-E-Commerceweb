import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { ProductDetails } from 'src/model/ProductDetails.model';
import { catchError } from 'rxjs/operators';
import { ResponseMessage } from 'src/model/ResponseMessage.model';
import { Cart } from 'src/model/Cart.model';
import { Order } from 'src/model/Order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string;

  constructor(private http:HttpClient, private service:LoginService) {
    this.url = service.url;
  }


  getProductByID(ProductID:string):Observable<ProductDetails[]>{
    return this.http.get<ProductDetails[]>(this.url+"user/getProductByID/"+ProductID).
    pipe(catchError(this.handleError))
  }

  addToCart(cart:Cart):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(this.url+"user/addToCart",cart).
    pipe(catchError(this.handleError))
  }

  getCartProducts(UserID:string):Observable<ProductDetails[]>{
    return this.http.get<ProductDetails[]>(this.url+"user/getCartProducts/"+UserID).
    pipe(catchError(this.handleError))
  }

  deleteCartProduct(UserID:string,ProductID:string):Observable<ResponseMessage>{
    return this.http.get<ResponseMessage>(this.url+"user/deleteCart/"+UserID+"/"+ProductID).
    pipe(catchError(this.handleError))
  }

  placeOrder(orders:Order[]):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(this.url+"user/placeOrder",orders).
    pipe(catchError(this.handleError)) 
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
