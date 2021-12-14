import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule,Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './login.component'
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginService } from './login.service';
import { UserModule } from './user/user.module';
import { RegisterComponent } from './register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt-interceptor';



const appRotues:Routes=[];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ],
  imports: [
    BrowserModule,
   
    AppRoutingModule,
    AdminModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRotues, {useHash:true}),
    ToastrModule.forRoot(),
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxSpinnerModule,
    UserModule,
  ],
  bootstrap: [AppComponent],
  providers:[LoginService,
  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}]
})
export class AppModule { }
