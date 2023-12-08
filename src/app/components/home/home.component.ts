import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/data/models/Movie';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentChecked {
  cols = 5;
  action: string = 'add';
  actions: Array<string> = ['title', 'releasedDate'];
  movies: Array<Movie> = [];
  watchList: Array<string> = [];
  watchListLength: number = 0;
  sortType: string | undefined = ''

  constructor(
    private changeDetector: ChangeDetectorRef,
    private moviesService: MoviesService,
    public helpersService: HelpersService
  ) { }

  ngOnInit(): void {
    this.sortType = this.moviesService.sort;
    this.getMovies(this.sortType);
    this.watchListLength = this.moviesService.watchlist.length;
    this.watchList = this.moviesService.watchlist;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  watchListStatus(title: string, update = false): string {
    const action = this.watchList.includes(title) ? 'remove' : 'add';
    if (update) {
      this.moviesService.manageWatchList(title, action);
    }
    return action;
  }

  getMovies(sort?: string): void {
    this.moviesService.getMovies(sort).subscribe(movies => { this.movies = movies });
  }
}
