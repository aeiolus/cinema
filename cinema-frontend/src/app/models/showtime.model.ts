import { Film } from './film.model';

export interface Showtime {
    id?: number;
    film: Film;
    startTime: string;
    createdAt?: string;
    updatedAt?: string;
}
