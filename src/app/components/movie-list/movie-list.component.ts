import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movie } from '../interfaces';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { HttpClientService } from 'src/app/services/http-client.service';

export enum MOVIE_LIST_MODE {
  Shopping = 0,
  Cart = 1,
  Library = 2,
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {

  @Output()
  addItemEvent = new EventEmitter<string>();

  @Output()
  removeItemEvent = new EventEmitter<string>();

  @Input()
  mode: MOVIE_LIST_MODE = MOVIE_LIST_MODE.Shopping;

  @Input()
  movies: Movie[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private httpClientService: HttpClientService
  ) {}

  ngOnInit(): void {}

  onAddToCartClick(id: string){
    this.addItemEvent.emit(id);
  }

  onRemoveFromCartClick(id: string) {
    this.removeItemEvent.emit(id);
  }

  get isShoppingMode() {
    return this.mode == MOVIE_LIST_MODE.Shopping;
  }

  get isCartMode() {
    return this.mode == MOVIE_LIST_MODE.Cart;
  }
}
