import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmsListComponent } from './films-list/films-list.component';
import { NewFilmComponent } from './new-film/new-film.component';
import { EditFilmComponent } from './edit-film/edit-film.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FilmsListComponent,
    NewFilmComponent,
    EditFilmComponent,
    FlashMessageComponent
  ],
  template: `
    <app-flash-message></app-flash-message>
    <div class="container">
      <h1>Cinema Film Management</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  title = 'Cinema Film Management';
}
