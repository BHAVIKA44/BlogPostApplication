import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  li:any;
  lis=[];
  constructor(private http : HttpClient){
      
}
  
  ngOnInit(): void {
    this.http.get('http://localhost:5000/BackEnd/posts/')
    .subscribe(Response => {
      console.log(this.li)

      
      this.li=Response;
      this.lis=this.li.list;
      console.log(this.li)
    });
    
  }
  
  
  
}
