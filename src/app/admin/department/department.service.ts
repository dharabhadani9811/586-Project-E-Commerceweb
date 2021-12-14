import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Department } from 'src/model/department.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class DepartmentService{

    url='http://localhost/api_management/api/department/';

    constructor(private http:HttpClient){

    }


    getDepartment():Observable<Department[]>{
        return this.http.get<Department[]>(this.url+"getDepartment").pipe(catchError(this.handleError));
    }

    getDepartmentById(dept_id:number):Observable<Department>{
        return this.http.get<Department>(this.url+"getDepartment/"+dept_id).pipe(catchError(this.handleError));
    }

    addDepartment(department:Department):Observable<string>{
        return this.http.post<string>(this.url+"addDepartment",department).pipe(catchError(this.handleError));
    }

    editDeparment(department:Department):Observable<string>{
        return this.http.post<string>(this.url+"updateDepartment",department).pipe(catchError(this.handleError));
    }

    deleteDepartment(dept_id:number):Observable<string>{
        return this.http.get<string>(this.url+"deleteDepartment/"+dept_id).pipe(catchError(this.handleError));
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