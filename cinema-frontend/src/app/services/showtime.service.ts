import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Showtime } from '../models/showtime.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ShowtimeService {
    private apiUrl = `${environment.apiUrl}/showtimes`;

    constructor(private http: HttpClient) { }

    getShowtimesByDate(date: string): Observable<Showtime[]> {
        return this.http.get<Showtime[]>(`${this.apiUrl}/date/${date}`);
    }

}
