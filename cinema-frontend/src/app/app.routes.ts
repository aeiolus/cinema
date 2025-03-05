import { Routes } from '@angular/router';
import { ShowtimesComponent } from './showtimes/showtimes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', loadComponent: () => import('./films-list/films-list.component').then(m => m.FilmsListComponent) },
  { path: 'films/new', loadComponent: () => import('./new-film/new-film.component').then(m => m.NewFilmComponent) },
  { path: 'films/edit/:id', loadComponent: () => import('./edit-film/edit-film.component').then(m => m.EditFilmComponent) },
  { path: 'showtimes', component: ShowtimesComponent }
];
