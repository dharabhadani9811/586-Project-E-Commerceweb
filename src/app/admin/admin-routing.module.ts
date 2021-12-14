import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterComponent } from './master.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee.component';
import { CardEmployeeComponent } from './employee/card-employee.component';
import { ListDepartmentComponent } from './department/list-department.component';
import { CreateDepartmentComponent } from './department/create-department.component';
import { ManageLeaveComponent } from './employee/manage-leave.component';
import { ComposeMessageComponent } from './employee/compose-message.component';
import { ViewDetailsComponent } from './employee/view-details.component';
import { AddProductComponent } from './add-product.component';
import { ListProductComponent } from './list-product.component';
import { ViewOrdersComponent } from './view-orders.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {path:'master',component:MasterComponent,children:
    [
      {path:'home',component:HomeComponent},
      {path:'createEmployee',component:CreateEmployeeComponent},
      {path:'viewEmployee',component:ViewEmployeeComponent,
        children:
        [
          {path:'card',component:CardEmployeeComponent}
        ]
      },
      {path:'leave',component:ManageLeaveComponent},
      {path:'compose',component:ComposeMessageComponent},
      {path:'details/:id',component:ViewDetailsComponent,},
      {path:'listDept',component:ListDepartmentComponent},
      {path:'createDept',component:CreateDepartmentComponent},
      {path:'add-product',component:AddProductComponent},
      {path:'list-product',component:ListProductComponent},
      {path:'orders',component:ViewOrdersComponent}
    ]
  },
  {path:'',redirectTo:'/master',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
