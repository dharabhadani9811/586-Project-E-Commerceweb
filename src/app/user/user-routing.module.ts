import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMasterComponent } from './user-master.component';
import { UserHomeComponent } from './user-home.component';
import { ProductDetailComponent } from './product-detail.component';
import { CartComponent } from './cart.component';
import { ThanksComponent } from './thanks.component';


const routes: Routes = [
  {path:'user',component:UserMasterComponent,children:
    [
      {path:'home',component:UserHomeComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'details/:id',component:ProductDetailComponent},
      {path:'cart',component:CartComponent},
      {path:'thanks',component:ThanksComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
