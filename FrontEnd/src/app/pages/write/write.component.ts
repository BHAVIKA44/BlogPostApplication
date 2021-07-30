import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {

  constructor(private http : HttpClient) { }
  public username: string = localStorage.getItem("user");
  public title: string = '';
  public desc: string = '';
   photo;
  public fileName:string='';
  public like:Number=1;
public alert:boolean=false;
li:any
  ngOnInit(): void {
    
  }
 

  selectImage(event) {
   
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.photo = file;
  this.fileName=Date.now() + file.name;

    }
  }
  doPost() {
   
    const formData = new FormData();
    formData.append('name', this.fileName);

    formData.append('file', this.photo);
 
    this.http.post('http://localhost:5000/BackEnd/upload', formData ).subscribe(
      Response => {
  
      
        this.li=Response;
        console.log(this.li)
      }
    );
    this.http.post('http://localhost:5000/BackEnd/posts', {username:
    this.username,title:this.title,desc:this.desc,like:this.like,photo:this.fileName }).subscribe(
      Response => {
  
      
        this.li=Response;
        window.location.replace("/post/"+this.li._id)
      },
      err => {
        this.alert=true
       }
    );
  }
  }


