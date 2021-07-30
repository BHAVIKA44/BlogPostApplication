import { Component ,OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as AOS from 'aos'; //<------ Add this line

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEnd';
  constructor() {
    AOS.init({
      duration:800
    }); //<------ Add this line
}
}
