import { Component, OnInit } from '@angular/core';
import { MOVIE_LIST_MODE } from '../movie-list/movie-list.component';
import { Movie } from '../interfaces';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-my-movies',
  templateUrl: './my-movies.component.html',
  styleUrls: ['./my-movies.component.css'],
})
export class MyMoviesComponent implements OnInit {
  MOVIES_LIST_MODE: MOVIE_LIST_MODE = MOVIE_LIST_MODE.Library;

  movies: Movie[] = [];

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService
      .get('/movies/user')
      .subscribe((moviesResult: Movie[]) => (this.movies = moviesResult));
  }
}
