import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Department } from 'src/model/department.model';
import { DepartmentService } from './department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  displayedColumns: string[] = ['dept_id', 'dept_name', 'dept_type','edit','delete'];
  department:Department[];
  dataSource = new MatTableDataSource<Department>(this.department);
  all:number;
  fullTime:number;
  partTime:number;
  isLoaded:boolean = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private deptService:DepartmentService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private dialog:MatDialog) { }

  ngOnInit(): void {
   // this.fetchDepartment();
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   this.fetchDepartment();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchDepartment():void{
    this.spinner.show();
    this.deptService.getDepartment().subscribe((data)=>{
      this.dataSource.data = data as Department[],
      this.all = this.dataSource.data.length;
      this.fullTime = this.dataSource.data.filter(dept=> dept.dept_type=="Full-Time").length;
      this.partTime = this.dataSource.data.filter(dept => dept.dept_type=="Part-Time").length;
      this.isLoaded = true,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

  edit(dept_id:number):void{
    this.router.navigate(['master/createDept'],{queryParams:{id:dept_id}});
  }

  delete(dept_id:number):void{

    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(result == "true")
        {
          this.spinner.show();
          this.deptService.deleteDepartment(dept_id).subscribe((data)=>{
            this.toastr.success(data,'Alert'),
            this.spinner.hide(),
            this.fetchDepartment();
          },(err)=>{
            this.toastr.error(err,'Alert'),
            this.spinner.hide();
          });
        }
    });
  }

  goToCreate():void{
    this.router.navigate(['master/createDept']);
  }

  // filterDept(){
  //   console.log("Test");
  //   this.dataSource.filter = 'Full-Time';
  // }

  filterDept(event:MatRadioChange){
    //console.log(event.value);
    var value= event.value;
    if(value == "all")
      this.dataSource.filter = '';
    else
      this.dataSource.filter = value;  

  }

}
