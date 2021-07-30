import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
alert:boolean =false
  public username: string = '';
  public password: string = '';
  constructor(private http : HttpClient) { }
res:any
  ngOnInit(): void {

  }
  doPost() {
     this.http.post('http://localhost:5000/BackEnd/auth/login', {username:
    this.username,password: this.password}).subscribe(Response => {
     localStorage.setItem("user",this.username) 

      this.res=Response;
      localStorage.setItem("userId",this.res._id) 
      window.location.replace("\home")
    },
      err => {
     this.alert=true
    });
    

 

  }
}
