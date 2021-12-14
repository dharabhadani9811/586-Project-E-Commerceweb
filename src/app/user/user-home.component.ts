import { Component, OnInit } from '@angular/core';
import { ProductDetails } from 'src/model/ProductDetails.model';
import { AdminService } from '../admin/admin.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  _searchTerm :string;
  public isMobile: boolean = false;
  product: ProductDetails[];
  filteredProducts : ProductDetails[];
  imageUrl:string;
  

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value :string){
    this._searchTerm = value;
    this.filteredProducts = this.filter(value);
  }
    

  filter(searchString : string){
    return this.product.filter(prod => prod.ProductName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 
  ||  prod.CategoryName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 );
  }

  constructor(breakpointObserver: BreakpointObserver,
    private service:AdminService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private loginService:LoginService) {
      breakpointObserver.observe([  
        '(max-width: 837px)'
      ]).subscribe(result => {
        this.isMobile = result.matches;
      });
      this.imageUrl = loginService.imageUrl;
   }

  ngOnInit(): void {
      this.fetchProducts();
  }

  fetchProducts():void{
    this.spinner.show();
    this.service.getProductList().subscribe((data)=>{
        this.product = data as ProductDetails[],
        this.filteredProducts = this.product,
        this.spinner.hide();
    },(err)=>{
       this.toastr.error(err,'Alert'),
       this.spinner.hide();
    });
  }

  viewDetails(ProductID:number){
    this.router.navigate(['user/details/'+ProductID]);
  }

}
