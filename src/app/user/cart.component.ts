import { Component, OnInit } from '@angular/core';
import { ProductDetails } from 'src/model/ProductDetails.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { LoginService } from '../login.service';
import { Order } from 'src/model/Order.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts:ProductDetails[] = [];
  imageUrl:string;
  TotalPrice:number = 0;
  TotalItems:number=0;
  UserID:string;
  orders:Order[] = [];
  

  constructor(private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private service:UserService,
    private loginService:LoginService) {
      this.imageUrl = loginService.imageUrl;
    }

  ngOnInit(): void {
    this.UserID = sessionStorage.getItem('UserID');
    
    this.getCartProducts();
  }

  getCartProducts(): void {
    this.spinner.show();
    this.service.getCartProducts(this.UserID).subscribe((data)=>{
      this.cartProducts = data as ProductDetails[];
      if(this.cartProducts != null && this.cartProducts.length > 0){
        this.TotalItems = this.cartProducts.length;
        this.TotalPrice = 0;
        this.cartProducts.forEach(element =>{
          if(element.ProductQty == undefined){
            element.ProductQty = 1;
          }
          this.TotalPrice += element.ProductPrice * element.ProductQty
        });
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

  onQtyChanged(index:number,price:number,qty:number):void{
    this.cartProducts[index].ProductQty = qty;
    //console.log(price + ""+ qty);
    this.TotalPrice = 0;
    this.cartProducts.forEach(element => {
      this.TotalPrice += element.ProductPrice * element.ProductQty
      console.log(this.TotalPrice);
    });
  }

  checkout():void{
    this.spinner.show();

    this.cartProducts.forEach(element => {
        let order = new Order();
        order.UserID =+ this.UserID;
        order.ProductID = element.ProductID;
        order.ProductQty = element.ProductQty;
        this.orders.push(order);
    });

    this.service.placeOrder(this.orders).subscribe((data)=>{
      let message = data.Message;
      this.toastr.success(message,'Alert');
      this.spinner.hide();
      if(message == 'Order placed successfully'){
        this.router.navigate(['user/thanks']);
      }
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });

    //console.log(this.orders);
  }

  removeProduct(ProductID:number){
    this.spinner.show();
    this.service.deleteCartProduct(this.UserID,ProductID.toString()).subscribe((data)=>{
      let message = data.Message;
      if(message == 'Product deleted'){
        this.toastr.success(message,'Alert');
        this.getCartProducts();
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
}
