import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { SharedService } from '../shared-service/shared-service';

interface MovieData
{
  Response: String,
  Year: String,
  Director : String,
  imdbRating: String,
  Language: String,
  Actors: String,
  Plot: String
}


@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {

  info: string = ""
  title: string = ""
  showMessage: boolean = false
  message = ""

  addForm = this.formBuilder.group({
  });


  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private formBuilder: FormBuilder,
              private sharedService: SharedService){}

  ngOnInit(): void {
    window.localStorage.setItem("activeTab", "2")
    let title = this.route.snapshot.paramMap.get('title');
    this.title = title as string
    let observable = this.http.get("https://www.omdbapi.com/?t="+ title + "&plot=full&apikey=e1d338ae&")
    observable.subscribe(data => {
      if ((data as MovieData).Response == 'False'){
        this.router.navigate(['/title-does-not-exist']);
      } else {
        if((data as MovieData).Year == 'N/A'){
          this.info += "Uknown publicing year\n\n"
        } else {
          this.info += "Publicing year: " + (data as MovieData).Year + "\n\n"
        }
        if((data as MovieData).Director == 'N/A'){
          this.info += "Unknown director\n\n"
        } else {
          this.info += "Director: " + (data as MovieData).Director + "\n\n"
        }
        if((data as MovieData).imdbRating == 'N/A'){
          this.info += "Unknown imdb-rating\n\n"
        } else {
          this.info += "imdb-rating: " + (data as MovieData).imdbRating + "\n\n"
        }
        if((data as MovieData).Language == 'N/A'){
          this.info += "Unknown language\n\n"
        } else {
          this.info += "Language: " + (data as MovieData).Language + "\n\n"
        }
        if((data as MovieData).Actors == 'N/A'){
          this.info += "Uknown actors\n\n"
        } else {
          this.info += "Actors: " + (data as MovieData).Actors + "\n\n"
        }
        if((data as MovieData).Plot == 'N/A'){
          this.info += "No information about the plot\n\n"
        } else {
          this.info += "Plot: " + (data as MovieData).Plot + "\n\n"
        }
      }
    })
  }

  onSubmit(): void {
    let storedTitles = window.localStorage.getItem("titles")
    let result = []
    if (storedTitles != null){
      result = JSON.parse(storedTitles)
    }
    if (!result.includes(this.title)){
      result.push(this.title)
      this.message = "Item added to cart"
    } else {
      this.message = "Item already in cart"
    }
    window.localStorage.setItem("titles", JSON.stringify(result))
    this.showMessage = true
    this.addForm.reset();
  }

}
