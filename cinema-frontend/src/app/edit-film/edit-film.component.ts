import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { FilmService } from '../services/film.service';
import { MessageService } from '../services/message.service';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-edit-film',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.scss']
})
export class EditFilmComponent implements OnInit {
  film: Film = new Film();
  isLoading = false;
  isSubmitting = false;

  constructor(
    private filmService: FilmService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFilm(+id);
    }
  }

  loadFilm(id: number): void {
    this.isLoading = true;
    this.filmService.getFilm(id).subscribe({
      next: (film) => {
        this.film = film;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading film', error);
        this.messageService.showMessage({
          type: 'error',
          text: error.error?.message || 'Failed to load film. Please try again.'
        });
        this.isLoading = false;
        this.router.navigate(['/films']);
      }
    });
  }

  updateFilm(): void {
    if (this.isSubmitting || !this.film.id) {
      return;
    }

    this.isSubmitting = true;
    this.filmService.updateFilm(this.film.id, this.film).subscribe({
      next: () => {
        this.messageService.showMessage({
          type: 'success',
          text: 'Film updated successfully!'
        });
        this.router.navigate(['/films']);
      },
      error: (error) => {
        console.error('Error updating film', error);
        this.messageService.showMessage({
          type: 'error',
          text: error.error?.message || 'Failed to update film. Please try again.'
        });
        this.isSubmitting = false;
      }
    });
  }
}
