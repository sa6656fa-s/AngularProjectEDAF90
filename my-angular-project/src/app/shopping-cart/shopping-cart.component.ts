import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    window.localStorage.setItem("activeTab", "4")
    let storedTitles = window.localStorage.getItem("titles")
    if (storedTitles != null){
      this.titles = JSON.parse(storedTitles)
    }
    if(this.titles == null) {
      this.titles = []
    }
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
