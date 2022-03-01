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

  movies: string[] = []
  titles: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.movies = []
    this.titles = []
    let searchString = this.searchForm.value.searchText

    let outerObservable = this.http.get("https://www.omdbapi.com/?s="+ searchString + "&apikey=e1d338ae&")
    outerObservable.subscribe(event => {
      for (let i in (event as SearchResponse).Search){
        let title = (((event as SearchResponse).Search[i]) as MovieInfo).Title
        let titleYear =  title + "; " + (((event as SearchResponse).Search[i]) as MovieInfo).Year
        this.titles.push(title)
        this.movies.push(titleYear)
      }
      
      let nbrAdditonalSeacrhes = Math.ceil((+(event as SearchResponse).totalResults - 1)/ 10)
      let loopObservable = range(2, nbrAdditonalSeacrhes - 1)
      loopObservable.subscribe(page => {
        let innerObservable = this.http.get("https://www.omdbapi.com/?s="+ searchString + "&page=" + page + "&apikey=e1d338ae&")
        innerObservable.subscribe(event2 => {
          for (let i in (event2 as SearchResponse).Search){
            let title = (((event2 as SearchResponse).Search[i]) as MovieInfo).Title
            let titleYear = title + "; " + (((event2 as SearchResponse).Search[i]) as MovieInfo).Year
            this.titles.push(title)
            this.movies.push(titleYear)
          }
        })
      })
    }) 
    
    this.searchForm.reset();
  }

}
