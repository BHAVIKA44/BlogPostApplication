import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
lis:any
  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/BackEnd/categories')
    .subscribe(Response => {
             
      this.lis=Response;
    });
  }

}
