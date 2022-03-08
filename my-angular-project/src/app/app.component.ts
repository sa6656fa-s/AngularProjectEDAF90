import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-project';
  activeTab = 1

  constructor(private route: ActivatedRoute){
    let url = window.location.href
    if (url == "http://localhost:4200/search-movie"){
      this.activeTab = 2
    } 
    else if(url == "http://localhost:4200/contact"){
      this.activeTab = 3
    } 
    else if(url == "http://localhost:4200/shopping-cart"){
      this.activeTab = 4
    } 
  }

}
