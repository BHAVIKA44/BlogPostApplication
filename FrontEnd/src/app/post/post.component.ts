import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
public folder="localhost:5000/images/";
  @Input() li:any;
  constructor() { }

  ngOnInit(): void {
    
  }


}
