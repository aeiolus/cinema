import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from '../models/film.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private apiUrl = `${environment.apiUrl}/films`;

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  getFilm(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.apiUrl}/${id}`);
  }

  createFilm(film: Film): Observable<Film> {
    return this.http.post<Film>(`${this.apiUrl}/new`, film);
  }

  updateFilm(id: number, film: Film): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/${id}`, film);
  }

  deleteFilm(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  activateFilm(id: number): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/${id}/activate`, {});
  }

  deactivateFilm(id: number): Observable<Film> {
    return this.http.put<Film>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
