import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';
import { MOVIE_LIST_MODE } from '../movie-list/movie-list.component';
import { Movie } from '../interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  mode: MOVIE_LIST_MODE = MOVIE_LIST_MODE.Shopping;
  movies: Movie[] = [];

  constructor(
    private httpClientService: HttpClientService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.httpClientService
      .get('/movies')
      .subscribe((moviesResult: Movie[]) => (this.movies = moviesResult));
  }

  onAddToCartClick(id: string) {
    let movies = this.localStorageService.getData('moviesIDs');
    if (movies) {
      if (movies.indexOf(id) < 0) {
        movies.push(id);
      }
    } else {
      movies = [id];
    }
    this.localStorageService.saveData('moviesIDs', movies);
  }
}
