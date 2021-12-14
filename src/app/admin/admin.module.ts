import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MasterComponent } from './master.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EmployeeService } from './employee/employee.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { ViewEmployeeComponent } from './employee/view-employee.component';
import { CardEmployeeComponent } from './employee/card-employee.component';
import { ListDepartmentComponent } from './department/list-department.component';
import { DepartmentService } from './department/department.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { CreateDepartmentComponent } from './department/create-department.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './department/dialog.component';
import { ManageLeaveComponent } from './employee/manage-leave.component';
import { ComposeMessageComponent } from './employee/compose-message.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { ViewDetailsComponent } from './employee/view-details.component';
import { AddProductComponent } from './add-product.component';
import { ListProductComponent } from './list-product.component';
import { ViewOrdersComponent } from './view-orders.component';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [MasterComponent, CreateEmployeeComponent, ViewEmployeeComponent, 
    CardEmployeeComponent, HomeComponent, ListDepartmentComponent, CreateDepartmentComponent, 
    DialogComponent, ManageLeaveComponent, ComposeMessageComponent, 
    ViewDetailsComponent, AddProductComponent, ListProductComponent, ViewOrdersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers:[EmployeeService,DepartmentService]
})
export class AdminModule { }
