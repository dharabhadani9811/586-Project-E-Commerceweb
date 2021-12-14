import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
