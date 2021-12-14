import { Component, OnInit } from '@angular/core';
import { Department } from 'src/model/department.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { DepartmentService } from './department.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {

  department:Department;
  deptId:number;
  title:string="Add";

  constructor(private deptServie:DepartmentService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private actRoute:ActivatedRoute) {
      this.actRoute.queryParams.subscribe(params => {
        let id = params['id'];
        this.deptId = id? id :0;      // if the id received from the parameter is undefined or null return 0
        this.loadDepartment(this.deptId);
     });
     }

  ngOnInit(): void {
    
  }


  loadDepartment(id:number):void{
    console.log(id);
    if(id === 0){
      this.department={
        dept_id:null,
        dept_name:null,
        dept_type:null
      } 
    }
    else
      {
        this.title="Edit";
        this.spinner.show();
        this.deptServie.getDepartmentById(id).subscribe((data)=>{
            this.department = data as Department,
            this.spinner.hide();
        },(err)=>{
            this.toastr.error(err,'Alert'),
            this.spinner.hide();
        });
      }
  }

  saveDept():void{
    this.spinner.show();
    if(this.deptId === 0){
      this.deptServie.addDepartment(this.department).subscribe((data)=>{
          this.toastr.success(data,'Alert'),
          this.spinner.hide(),
          this.router.navigate(['master/listDept']);
      },(err)=>{
          this.toastr.error(err,'Alert'),
          this.spinner.hide();
      });
    }
    else{
      this.deptServie.editDeparment(this.department).subscribe((data)=>{
        this.toastr.success(data,'Alert'),
        this.spinner.hide(),
        this.router.navigate(['master/listDept']);
      },(err)=>{
        this.toastr.error(err,'Alert'),
        this.spinner.hide();
      });
    }
    //this.router.navigate(['master/listDept']);
  }


}
