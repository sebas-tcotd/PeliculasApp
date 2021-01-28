import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  CarteleraResponse,
  Movie,
} from '../interfaces/cartelera-response.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { MovieDetails } from '../interfaces/movie-details.interface';
import {
  Cast,
  CreditsResponse,
} from '../interfaces/credits-response.interface';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private url: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '83f8e1c95247a8b82fc5c6966b5940d9',
      language: 'es-PE',
      page: this.carteleraPage.toString(),
    };
  }

  resetCarteleraPage() {
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    console.log('Cargando API');

    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.url}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((res) => res.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };
    return this.http
      .get<CarteleraResponse>(`${this.url}/search/movie`, {
        params,
      })
      .pipe(map((res) => res.results));
  }

  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieDetails>(`${this.url}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.url}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((res) => res.cast),
        catchError((err) => of([]))
      );
  }
}
