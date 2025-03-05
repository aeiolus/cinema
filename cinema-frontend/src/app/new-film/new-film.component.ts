import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FilmService } from '../services/film.service';
import { MessageService } from '../services/message.service';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-new-film',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent {
  film: Film = new Film();
  isSubmitting = false;

  constructor(
    private filmService: FilmService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.resetForm();
  }

  resetForm(): void {
    this.film = new Film();
    this.film.state = 'OPEN';  // Set default state for new films
  }

  addFilm(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.filmService.createFilm(this.film).subscribe({
      next: () => {
        this.messageService.showMessage({
          type: 'success',
          text: 'Film added successfully!'
        });
        this.router.navigate(['/films']);
      },
      error: (error) => {
        console.error('Error adding film', error);
        this.messageService.showMessage({
          type: 'error',
          text: error.error?.message || 'Failed to add film. Please try again.'
        });
        this.isSubmitting = false;
      }
    });
  }
}
