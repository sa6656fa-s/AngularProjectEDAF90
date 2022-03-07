import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  titles: string[] = []
  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.titles =  JSON.parse(window.localStorage.getItem("titles") as string)
    let newTitle = this.route.snapshot.paramMap.get('newTitle')
    console.log(newTitle)
    if (newTitle != null){
      this.titles.push(newTitle)
    }
    window.localStorage.setItem("titles", JSON.stringify(this.titles))
  }
   
}
