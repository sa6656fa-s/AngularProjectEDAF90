import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface MovieInfo
{
  Year: String,
  Director : String,
  imdbRating: String,
  Language: String,
  Actors: String,
  Plot: String
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  movieInfos: string[] = ["","","","","","","","","",""]
  titles: string[] = ["","","","","","","","","",""]
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    window.localStorage.setItem("activeTab", "1")

    this.addTitle("The Shawshank Redemption", 0)
    this.addTitle("The Godfather", 1)
    this.addTitle("The Dark Knight", 2)
    this.addTitle("The Godfather: Part II", 3)
    this.addTitle("12 Angry Men", 4)
    this.addTitle("The Lord of the Rings: The Return of the King", 5)
    this.addTitle("Schindler's List", 6)
    this.addTitle("Pulp Fiction", 7)
    this.addTitle("The Lord of the Rings: The Fellowship of the Ring", 8)
    this.addTitle("Inception", 9)
  }

  addTitle(title: string, index: number){
    let observable = this.http.get("https://www.omdbapi.com/?t=" + title + "&plot=full&apikey=e1d338ae&")
    observable.subscribe(data => {
      this.titles[index] = title
      let result = "imdb rating: " + (data as MovieInfo).imdbRating + "\n"
      result += "Published: " + (data as MovieInfo).Year + "\n" 
      result += "Director: " + (data as MovieInfo).Director + "\n"
      result += "Language: " + (data as MovieInfo).Language + "\n"
      result += "Actors: " + (data as MovieInfo).Actors + "\n"
      result += "Plot: " + (data as MovieInfo).Plot + "\n"
      this.movieInfos[index] = result
    })
  }

}
