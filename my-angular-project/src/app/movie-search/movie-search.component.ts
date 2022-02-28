import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { range } from 'rxjs';

interface SearchResponse
{
  Search: Object[],
  totalResults: string
}

interface MovieInfo
{
  Title: string
  Year: string
}

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {

  searchForm = this.formBuilder.group({
    searchText: ''
  });

  movies: String[] = []

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.movies = []
    let searchString = this.searchForm.value.searchText

    let outerObservable = this.http.get("https://www.omdbapi.com/?s="+ searchString + "&apikey=e1d338ae&")
    outerObservable.subscribe(event => {
      for (let i in (event as SearchResponse).Search){
        let titleYear = (((event as SearchResponse).Search[i]) as MovieInfo).Title + "; " + (((event as SearchResponse).Search[i]) as MovieInfo).Year
        this.movies.push(titleYear)
      }
      
      let nbrAdditonalSeacrhes = Math.ceil((+(event as SearchResponse).totalResults - 1)/ 10)
      let loopObservable = range(2, nbrAdditonalSeacrhes - 1)
      loopObservable.subscribe(page => {
        let innerObservable = this.http.get("https://www.omdbapi.com/?s="+ searchString + "&page=" + page + "&apikey=e1d338ae&")
        innerObservable.subscribe(event2 => {
          for (let i in (event2 as SearchResponse).Search){
            let titleYear = (((event2 as SearchResponse).Search[i]) as MovieInfo).Title + "; " + (((event2 as SearchResponse).Search[i]) as MovieInfo).Year
            this.movies.push(titleYear)
          }
        })
      })
    }) 
    
    this.searchForm.reset();
  }

}
