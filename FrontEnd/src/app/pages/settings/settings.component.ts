import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private http : HttpClient) { }
  public username: string = '';
  public email: string = '';
  public password: string = '';
  public id;
  res:any
  ngOnInit(): void {
  }
  doUpdate() {
  this.id=localStorage.getItem("userId")
  console.log(this.id)
    this.http.put('http://localhost:5000/BackEnd/users/'+this.id, {userId:this.id,
      username:
    this.username,email:this.email,password: this.password}).subscribe(Response => {
      localStorage.setItem("user",this.username) 
 
       this.res=Response;
      
     });
    window.location.replace("/home");
  }
}
