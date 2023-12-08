import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Movie } from '../data/models/Movie';
import { MoviesData } from '../data/moviesData';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private storageSub = new Subject<Array<string>>();
  watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
  sort = localStorage.getItem('sort')!;
  movies: Array<Movie> = MoviesData;
  constructor() { }

  getMovies(sortBy?: string): Observable<Array<Movie>> {
    if (sortBy) {
      this.sortMovies(sortBy);
    }

    return of(this.movies);
  }

  getMovie(title: string): Observable<Movie> {
    const movie = this.movies.find(m => m.title === title)!;

    return of(movie);
  }

  getRecomendations(movie: Movie): Array<Movie> {
    const movieGen = movie.genre;
    let moviesRecom = [];
    if (movieGen.length > 0) {
      const filteredMovies = this.movies.filter(
        rec => rec.genre.some(movie => movieGen.includes(movie))
      ).filter(filmovie => filmovie.title !== movie.title);
      moviesRecom.push(...filteredMovies);
    }

    return moviesRecom;
  }

  manageWatchList(title: string, type: string): void {
    if (type === 'add') {
      this.watchlist.push(title);
    }

    if (type === 'remove') {
      this.watchlist = this.watchlist.filter((movie: string) => movie !== title);
    }
    this.storageSub.next(this.watchlist);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  checkWatchList(): Observable<any> {
    return this.storageSub.asObservable();
  }

  private sortMovies(sortBy: string): void {
    localStorage.setItem('sort', sortBy);
    const key = sortBy as keyof Movie;
    this.movies.sort((item1: Movie, item2: Movie) => {
      const value1 = key === 'title' ? item1[key] : new Date(item1[key]);
      const value2 = key === 'title' ? item2[key] : new Date(item2[key]);

      if (value1 > value2) {
        return 1;
      }

      if (value1 < value2) {
        return -1;
      }

      return 0
    });
  }
}
