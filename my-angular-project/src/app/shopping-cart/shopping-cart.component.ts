import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../shared-service/shared-service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  titles: string[] = []
  submitted: boolean = false

  submitOrderForm = this.formBuilder.group({
  });

  constructor(private router: Router,  
              private formBuilder: FormBuilder,
              private sharedService: SharedService) {}

  ngOnInit(): void {
    let storedTitles = window.localStorage.getItem("titles")
    if (storedTitles != null){
      this.titles = JSON.parse(storedTitles)
    }
    if(this.titles == null) {
      this.titles = []
    }
    let newTitle = this.sharedService.newTitle
    if (newTitle != ""){
      this.titles.push(newTitle)
    }
    this.sharedService.newTitle = ""
    window.localStorage.setItem("titles", JSON.stringify(this.titles))
  }
   
  onSubmit(): void {
    console.log(this.titles)
    window.localStorage.clear()
    window.localStorage.setItem("titles", JSON.stringify([]))
    this.ngOnInit()
    this.submitted = true
    this.submitOrderForm.reset();
  }

}
