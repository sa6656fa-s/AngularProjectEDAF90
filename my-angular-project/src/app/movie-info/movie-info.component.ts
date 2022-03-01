import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient){}

  ngOnInit(): void {
    let title = this.route.snapshot.paramMap.get('title');
    this.title = title as string
    let observable = this.http.get("https://www.omdbapi.com/?t="+ title + "&plot=full&apikey=e1d338ae&")
    observable.subscribe(data => {
      if ((data as MovieData).Response == 'False'){
        this.router.navigate(['/titeln-finns-inte']);
      } else {
        if((data as MovieData).Year == 'N/A'){
          this.info += "Okänt publiceringsår\n\n"
        } else {
          this.info += "Publiceringsår: " + (data as MovieData).Year + "\n\n"
        }
        if((data as MovieData).Director == 'N/A'){
          this.info += "Okänd regissör\n\n"
        } else {
          this.info += "Regissör: " + (data as MovieData).Director + "\n\n"
        }
        if((data as MovieData).imdbRating == 'N/A'){
          this.info += "Okänd imdb-rating\n\n"
        } else {
          this.info += "imdb-rating: " + (data as MovieData).imdbRating + "\n\n"
        }
        if((data as MovieData).Language == 'N/A'){
          this.info += "Okänt språk\n\n"
        } else {
          this.info += "Språk: " + (data as MovieData).Language + "\n\n"
        }
        if((data as MovieData).Actors == 'N/A'){
          this.info += "Okänt vilka skådespelare som medverkar\n\n"
        } else {
          this.info += "Skådespelare: " + (data as MovieData).Actors + "\n\n"
        }
        if((data as MovieData).Plot == 'N/A'){
          this.info += "Finns ingen information om handlingen\n\n"
        } else {
          this.info += "Handling: " + (data as MovieData).Plot + "\n\n"
        }
      }
    })
  }

}
