import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public user:boolean=false
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=null){
          this.user=true
    }
  }
  logoutUser():void{
    localStorage.removeItem("user")
    localStorage.removeItem("userId")
    window.location.reload()
    window.location.replace("/login");
  }

}
