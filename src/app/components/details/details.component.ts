import { Component, TemplateRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Movie } from 'src/app/data/models/Movie';
import { HelpersService } from 'src/app/services/helpers.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  title: string;
  movie: Movie;
  recomendations: Array<Movie> = [];
  safeUrl: SafeResourceUrl;
  modalRef?: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private modalService: BsModalService,
    private domSanitizer: DomSanitizer,
    private router: Router,
    public helpersService: HelpersService
  ) {
    this.title = this.activatedRoute.snapshot.params['title'];
  }

  ngOnInit(): void {
    this.getMovieDetails();
    this.getRecomendations();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  private getMovieDetails(): void {
    this.moviesService.getMovie(this.title).subscribe(movie => {
      
      if (!movie) {
        this.router.navigate(['home']);
      }

      this.movie = movie;
      const formatUrl = movie.trailerLink.replace('watch?v=', 'embed/');
      this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(formatUrl);
    });
  }

  private getRecomendations(): void {
    this.recomendations = this.moviesService.getRecomendations(this.movie);
  }
}
