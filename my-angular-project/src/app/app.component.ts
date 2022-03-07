import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared-service/shared-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-angular-project';
  activeTab = 1

  constructor(private sharedService: SharedService){}
  ngOnInit(): void {
    let activeTab = window.localStorage.getItem("activeTab")
    if (activeTab != null){
      this.activeTab = +activeTab
    }
    console.log("app activeTabe: ", this.activeTab)
  }

}
