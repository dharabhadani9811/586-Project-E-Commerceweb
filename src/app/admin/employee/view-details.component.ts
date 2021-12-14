import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  emp_id:number;
  employee:Employee;

  constructor(private route:ActivatedRoute,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private empService:EmployeeService) { }

  ngOnInit(): void {
    this.emp_id = this.route.snapshot.params['id'];
    if(this.emp_id > 0){
      this.fetchEmployee(this.emp_id);
    }
  }

  fetchEmployee(emp_id:number):void{
    this.spinner.show();
    this.empService.getEmployeeById(emp_id).subscribe((data)=>{
      this.employee = data as Employee,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }
}
