import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1; 

  constructor(private router:Router) {
    this.navLinks = [
      {
          label: 'Card View',
          link: './card',
          index: 0
      }, {
          label: 'List View',
          link: './list',
          index: 1
      }
    ];
   }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
