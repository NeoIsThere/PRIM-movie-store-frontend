import { Component, OnInit } from '@angular/core';
import { Movie, MoviesDataResponse, PriceResponse } from '../interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Router } from '@angular/router';
import { MOVIE_LIST_MODE } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  movies: Movie[] = [];
  totalPrice: number = 0;

  MOVIES_LIST_MODE: MOVIE_LIST_MODE = MOVIE_LIST_MODE.Cart;

  constructor(
    private localStorageService: LocalStorageService,
    private httpClient: HttpClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchMoviesData();
  }

  onRemoveFromCartClick(id: string) {
    let moviesIDs = this.localStorageService.getData('moviesIDs');

    if (!moviesIDs) {
      moviesIDs = [];
    }

    moviesIDs = moviesIDs.filter((_id: string) => _id != id);
    this.movies = this.movies.filter((mov: Movie) => mov._id != id);

    this.localStorageService.saveData('moviesIDs', moviesIDs);

    this.computeTotalPrice();
  }

  computeTotalPrice() {
    const ids = this.movies.map((mov) => mov._id);
    this.httpClient
      .post('/prices', { moviesIDs: ids })
      .subscribe(
        (priceResponse: PriceResponse) =>
          (this.totalPrice = priceResponse.price)
      );
  }

  fetchMoviesData() {
    const moviesIDs = this.localStorageService.getData('moviesIDs');

    if (moviesIDs) {

      this.httpClient
        .post('/movies', { moviesIDs })
        .subscribe((moviesResponse: Movie[]) => {
          this.movies = moviesResponse;
          this.computeTotalPrice();
        });
    }
  }

  onPayClick() {
    this.router.navigateByUrl('/payment');
  }

  get isCartEmpty() {
    return this.movies.length == 0;
  }
}
