import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  li:any
  path:string
  username:string=localStorage.getItem("user")
  update:boolean=false
  title:string=''
  desc:string=''
  alert:boolean=false
public  folder:"http://localhost:5000/images/";
  constructor(private route:ActivatedRoute,private router: Router,private http : HttpClient) {
    
    }
  
    state():boolean{
      if(this.username==null){
        return true
      }
      return false
    }

func():boolean{
  if(this.username==this.li.username){
    return true;
  }
  return false;
}
  ngOnInit(): void {
    folder:"http://localhost:5000/images/";
    this.route.params.subscribe(routeParams => {
    
    this.path=this.router.url.split("/")[2]

    this.http.get('http://localhost:5000/BackEnd/posts/'+this.path)
    .subscribe(Response => {
             
      this.li=Response;
      console.log(this.path)
    });
   
    });
  }
updateStatus(){
  this.update=true
}
doUpdate(){
  this.http.put('http://localhost:5000/BackEnd/posts/'+this.path, {username:this.username,title:this.title,desc:this.desc,}).subscribe( Response => {
  
      
    this.li=Response;
    window.location.reload()
  },
  err => {
    this.alert=true
   });
  this.update=false

}
  doDelete() {
    this.http.delete('http://localhost:5000/BackEnd/posts/'+this.path, {body:{username:this.username},}).subscribe();
    window.location.replace("/home");
  }
  

  // Function to dislike a blog post
  doLike(){

   this.http.put('http://localhost:5000/BackEnd/posts/likeBlog/'+this.path, {username:this.username}).subscribe(Response => {
             
    this.li=Response;
    console.log(this.li)
    window.location.reload()
  });
}
  doDisLike(){

    this.http.put('http://localhost:5000/BackEnd/posts/disLikeBlog/'+this.path, {username:this.username}).subscribe(Response => {
              
     this.li=Response;
     console.log(this.li)
     window.location.reload()

   });
 
  }
}

