import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserMasterComponent } from './user-master.component';
import { UserHomeComponent } from './user-home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProductDetailComponent } from './product-detail.component';
import { CartComponent } from './cart.component';
import { ThanksComponent } from './thanks.component';


@NgModule({
  declarations: [UserMasterComponent, UserHomeComponent, ProductDetailComponent, CartComponent, ThanksComponent],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MatGridListModule,
    NgxSpinnerModule
  ]
})
export class UserModule { }
