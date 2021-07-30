import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http : HttpClient) { }
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public alert:boolean=false;

  ngOnInit(): void {

  }
  doPost() {
  

    this.http.post('http://localhost:5000/BackEnd/auth/register', {username:
    this.username,email:this.email,password: this.password}).subscribe(Response => {
 
       
       window.location.replace("\login")
     },
       err => {
      this.alert=true
     });

  }


}
