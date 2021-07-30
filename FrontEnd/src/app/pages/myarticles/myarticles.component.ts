import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit {

  li:any;
  lis=[];
  user:String
  constructor(private http : HttpClient){
      
}
  
  ngOnInit(): void {
this.user=localStorage.getItem("user")
    this.http.get('http://localhost:5000/BackEnd/posts/?user='+this.user)
    .subscribe(Response => {
      console.log(this.li)

      
      this.li=Response;
      this.lis=this.li.list;
      console.log(this.li)
    });
    
  }
}
