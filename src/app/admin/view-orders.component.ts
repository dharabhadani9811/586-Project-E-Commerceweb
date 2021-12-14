import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderDetails } from 'src/model/OrderDetails.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from './admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetails } from 'src/model/ProductDetails.model';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  displayedColumns: string[] = ['oID', 'UserName', 'Address','ProductName','ProductQty','TotalPrice',
  'OrderDate'];
  order:OrderDetails[];
  dataSource = new MatTableDataSource<OrderDetails>(this.order);
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
    this.service.getOrders().subscribe((data)=>{
      this.dataSource.data = data as OrderDetails[],
      this.all = this.dataSource.data.length;
      this.isLoaded = true,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

}
