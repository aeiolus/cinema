import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { NewFilmComponent } from './new-film/new-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';

const routes: Routes = [
  { path: '', redirectTo: '/films', pathMatch: 'full' },
  { path: 'films', component: FilmsListComponent },
  { path: 'films/new', component: NewFilmComponent },
  { path: 'films/edit/:id', component: EditFilmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
