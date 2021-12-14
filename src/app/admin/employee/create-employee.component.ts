import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/model/employee';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee:Employee;
  imagePath:string[] = ['/assets/images/avatar.png','/assets/images/avatar2.png',
  '/assets/images/avatar3.png','/assets/images/avatar5.png'];
  datePickerConfig: Partial<BsDatepickerConfig>;
  fileToUpload : File;
  basePath : string;
  imageUrl:string; 
  previewPhoto = false;
  empId : number;
  btnText:string;

  constructor(private empService:EmployeeService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private actRoute:ActivatedRoute,private router:Router) {
    
    }

  ngOnInit(): void {

    this.actRoute.queryParams.subscribe(params => {
      let id = params['id'];
      this.empId = id? id :0;      // if the id received from the parameter is undefined or null return 0
      this.loadEmployee(this.empId);
   });

    var index = this.randomIntFromInterval(0,3);
    
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue', 
        showWeekNumbers:false,
        dateInputFormat:'DD/MM/YYYY',
      });
  }

  loadEmployee(id:number):void{
    if(id === 0){
      this.btnText ="Add";
      this.employee = {
        id:null,
        name:null,
        email:null,
        contact:null,
        gender:null,
        image:null,
        imageName:null,
        salary:null,
        dateOfBirth:null,
        department:"IT",
        address:null,
        latitude:null,
        longitude:null
      };
    }
    else{
      this.btnText = "Edit";
      this.spinner.show();
      this.empService.getEmployeeById(id).subscribe((data)=>{
          this.employee = data as Employee,
          this.spinner.hide();
      },(err)=>{
          this.toastr.error(err,'Alert'),
          this.spinner.hide();
      });
    }
  }


  saveEmployee():void{
    //console.log(this.employee);
    this.spinner.show();

    if(this.empId === 0){
      this.empService.addEmployee(this.employee).subscribe((data)=> {
        this.toastr.success(data,'Alert'),
        this.spinner.hide(),
        this.router.navigate(['master/viewEmployee/card']);
      },(err)=>{
        this.toastr.error(err,'Alert'),
        this.spinner.hide();
      });
    }
    else{
        this.employee.id = this.empId;
        console.log(this.employee);
        this.empService.updateEmployee(this.employee).subscribe((data)=>{
          this.toastr.success(data,'Alert'),
          this.spinner.hide();
          this.router.navigate(['master/viewEmployee/card']);
        },(err)=>{
          this.toastr.error(err,'Alert'),
          this.spinner.hide();
        });
        //console.log("Edit");
    }
  }



  handleFileInput(file :FileList):void{
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onloadend= (event : any) =>{
      this.imageUrl = event.target.result;
      this.basePath = event.target.result;
      this.employee.image = this.basePath.split(',')[1];
      this.employee.imageName = this.fileToUpload.name;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  togglePhotoPreview(){
    this.previewPhoto = !this.previewPhoto;
  }

  randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
