import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetails } from 'src/model/ProductDetails.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DepartmentService } from './department/department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Department } from 'src/model/department.model';
import { DialogComponent } from './department/dialog.component';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  displayedColumns: string[] = ['ProductID', 'CategoryName', 'ProductName','ProductDescription','ProductPrice',
  'delete'];
  product:ProductDetails[];
  dataSource = new MatTableDataSource<ProductDetails>(this.product);
  all:number;
  fullTime:number;
  partTime:number;
  isLoaded:boolean = false;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }
  constructor(private service:AdminService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
   // this.fetchDepartment();
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   this.fetchProducts();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchProducts():void{
    this.spinner.show();
    this.service.getProductList().subscribe((data)=>{
      this.dataSource.data = data as ProductDetails[],
      this.all = this.dataSource.data.length;
      this.isLoaded = true,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }



  delete(ProductID:string):void{
    this.spinner.show();
    this.service.deleteProduct(ProductID).subscribe((data)=>{
      let message = data.Message;
      if(message == 'Product deleted'){
        this.toastr.success(message,'Alert');
        this.fetchProducts();
      }
      else{
        this.toastr.error(message,'Alert');
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });

    // const dialogRef = this.dialog.open(DialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result == "true")
    //     {
    //       this.spinner.show();
    //       this.deptService.deleteDepartment(dept_id).subscribe((data)=>{
    //         this.toastr.success(data,'Alert'),
    //         this.spinner.hide(),
    //         this.fetchDepartment();
    //       },(err)=>{
    //         this.toastr.error(err,'Alert'),
    //         this.spinner.hide();
    //       });
    //     }
    // });
  }

  goToCreate():void{
    this.router.navigate(['master/add-product']);
  }

  // filterDept(){
  //   console.log("Test");
  //   this.dataSource.filter = 'Full-Time';
  // }



}
