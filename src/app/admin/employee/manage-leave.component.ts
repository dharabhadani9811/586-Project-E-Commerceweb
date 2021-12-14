import { Component, OnInit, ViewChild } from '@angular/core';
import { RespLeave } from 'src/model/respLeave.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogComponent } from '../department/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.css']
})
export class ManageLeaveComponent implements OnInit {

  displayedColumns: string[] = ['leave_id','emp_name','emp_contact','dept_name','desc',
  'sdate','edate','approve','disapprove'];
  respLeave:RespLeave[];
  dataSource = new MatTableDataSource<RespLeave>(this.respLeave);
  username:string;
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

 
  constructor(private router:Router,private empService:EmployeeService,
    private toastr:ToastrService,private spinner:NgxSpinnerService,private dialog:MatDialog)
     { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("username");
      if(this.username == null)
        this.router.navigate(['/login']);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.fetchLeave();
  }
  

  fetchLeave():void{
    this.spinner.show();
    this.empService.getLeave().subscribe((data)=>{
      this.dataSource.data = data as RespLeave[],
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

  approve(leave_id:number):void{
    const dialogRef = this.dialog.open(DialogComponent,{data: {
      dataKey: "Are you sure you want to approve the leave ?",
    }});    
    dialogRef.afterClosed().subscribe(result => {
      if(result == "true")
        {
          this.appDisLeave(leave_id,1);
        }
    });   
  }


  disapprove(leave_id:number):void{
    const dialogRef = this.dialog.open(DialogComponent,{data: {
      dataKey: "Are you sure you want to disapprove the leave ?",
    }});    
    dialogRef.afterClosed().subscribe(result => {
      if(result == "true")
        {
          this.appDisLeave(leave_id,2);
        }
    });   
  }

  appDisLeave(leave_id:number,status:number){
    this.spinner.show();
    this.empService.updateLeave(leave_id,status).subscribe((data)=>{
        this.toastr.success(data,'Alert'),
        this.spinner.hide();
    },(err)=>{
        this.toastr.error(err,'Alert'),
        this.spinner.hide();
    })
  }


}
