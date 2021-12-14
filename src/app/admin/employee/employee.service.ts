import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Employee } from 'src/model/employee';
import { Observable, throwError } from 'rxjs';
import { catchError  } from 'rxjs/operators';
import { RespLeave } from 'src/model/respLeave.model';
import { Message } from 'src/model/message.model';
import { Marker } from 'src/model/marker.model';


@Injectable()
export class EmployeeService {

  url='http://localhost/api_management/api/employee/';


  constructor(private http:HttpClient) {
    
   }

   getEmployee():Observable<Employee[]>{
     return this.http.get<Employee[]>(this.url+"getEmployee").pipe(catchError(this.handleError));
   }

   getEmployeeById(emp_id:number):Observable<Employee>{
     return this.http.get<Employee>(this.url+"getEmployee/"+emp_id).pipe(catchError(this.handleError));
   }

   getEmployeeByDept(dept_id:number):Observable<Employee[]>{
     return this.http.get<Employee[]>(this.url+"getEmployeeByDept/"+dept_id).
     pipe(catchError(this.handleError))
   }

   addEmployee(employee:Employee):Observable<string>{
     return this.http.post<string>(this.url+"addEmployee",employee).pipe(catchError(this.handleError));
   }

   updateEmployee(employee:Employee):Observable<string>{
      return this.http.post<string>(this.url+"updateEmployee",employee).pipe(catchError(this.handleError));
   }

   deleteEmployee(emp_id:number):Observable<string>{
     return this.http.get<string>(this.url+"deleteEmployee/"+emp_id).pipe(catchError(this.handleError));
   }

   getLeave():Observable<RespLeave[]>{
     return this.http.get<RespLeave[]>(this.url+"getLeave").pipe(catchError(this.handleError));
   }

   addMessage(message:Message):Observable<string>{
     return this.http.post<string>(this.url+"compose",message).pipe(catchError(this.handleError));
   }

   updateLeave(leave_id:number,status:number):Observable<string>{
     return this.http.get<string>(this.url+"updateLeave/"+leave_id+"/"+status).
      pipe(catchError(this.handleError))
   }

   getLocation():Observable<Marker[]>{
     return this.http.get<Marker[]>(this.url+"getLocation").pipe(catchError(this.handleError));
   }


   private handleError(errorResponse : HttpErrorResponse)
   {
       if(errorResponse.error instanceof ErrorEvent)
       {
          // console.log("Client side Error: ",errorResponse.error.message);
       }
       else
       {
           //console.error("Server Side Error: ",errorResponse.error.message);
       }
       return throwError("There is a problem with the service.We are notified & working on it.Please try again later");
   }


}
