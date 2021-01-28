import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlide: Movie[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe((movies) => {
      this.movies = movies;
      this.moviesSlide = movies;
    });
  }

  @HostListener('window: scroll')
  onScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (pos > max) {
      if (this.peliculasService.cargando) return;

      this.peliculasService.getCartelera().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }
}
