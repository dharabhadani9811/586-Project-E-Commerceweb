import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../admin/employee/employee.service';
import { ProductDetails } from 'src/model/ProductDetails.model';
import { UserService } from './user.service';
import { Product } from 'src/model/Product.model';
import { LoginService } from '../login.service';
import { Cart } from 'src/model/Cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  ProductID:number;
  imageUrl:string;
  product:ProductDetails[] = [];
  cart:Cart = new Cart();

  constructor(private route:ActivatedRoute,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private service:UserService,
    private loginService:LoginService) {
      this.imageUrl = loginService.imageUrl;
     }

  ngOnInit(): void {
    
    this.ProductID = this.route.snapshot.params['id'];
    if(this.ProductID > 0){
      this.fetchProduct(this.ProductID);
    }
  }

  fetchProduct(ProductID:number){
    this.spinner.show();
    this.service.getProductByID(ProductID.toString()).subscribe((data)=>{
      this.product = data as ProductDetails[],
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

  addToCart():void{
    this.spinner.show();
    this.cart.ProductID = this.ProductID;
    this.cart.UserID =+ sessionStorage.getItem('UserID');
    this.service.addToCart(this.cart).subscribe((data)=>{
      let message = data.Message;
      this.toastr.success(message,'Alert');
      this.router.navigate(['user/home']);
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

}
