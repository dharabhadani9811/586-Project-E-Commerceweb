import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styleUrls: ['./card-employee.component.css']
})
export class CardEmployeeComponent implements OnInit {

  _searchTerm :string;
  public isMobile: boolean = false;
  employees: Employee[];
  filteredEmployees : Employee[];
  

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value :string){
    this._searchTerm = value;
    this.filteredEmployees = this.filter(value);
  }
    

  filter(searchString : string){
    return this.employees.filter(emp => emp.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(breakpointObserver: BreakpointObserver,private http:HttpClient,
    private empService:EmployeeService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router) {
      breakpointObserver.observe([  
        '(max-width: 837px)'
      ]).subscribe(result => {
        this.isMobile = result.matches;
      });
      
   }

  ngOnInit(): void {
      this.fetchEmployees();
  }

  fetchEmployees():void{
    this.spinner.show();
    this.empService.getEmployee().subscribe((data)=>{
        this.employees = data as Employee[],
        this.filteredEmployees = this.employees,
        this.spinner.hide();
    },(err)=>{
       this.toastr.error(err,'Alert'),
       this.spinner.hide();
    });
  }

  viewDetails(emp_id:number){
    this.router.navigate(['master/details/'+emp_id]);
  }


}
