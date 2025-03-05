import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilmService } from '../services/film.service';
import { MessageService } from '../services/message.service';
import { Film } from '../models/film.model';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {
  films: Film[] = [];
  isLoading = false;

  constructor(
    private filmService: FilmService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    this.isLoading = true;
    this.filmService.getFilms().subscribe({
      next: (films) => {
        this.films = films;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading films', error);
        this.messageService.showMessage({
          type: 'error',
          text: 'Failed to load films. Please try again.'
        });
        this.isLoading = false;
      }
    });
  }

  deleteFilm(id: number): void {
    if (!confirm('Are you sure you want to delete this film?')) {
      return;
    }

    this.filmService.deleteFilm(id).subscribe({
      next: () => {
        this.messageService.showMessage({
          type: 'success',
          text: 'Film deleted successfully!'
        });
        this.loadFilms();
      },
      error: (error) => {
        console.error('Error deleting film', error);
        this.messageService.showMessage({
          type: 'error',
          text: 'Failed to delete film. Please try again.'
        });
      }
    });
  }

  activateFilm(id: number): void {
    this.filmService.activateFilm(id).subscribe({
      next: () => {
        this.messageService.showMessage({
          type: 'success',
          text: 'Film activated successfully!'
        });
        this.loadFilms();
      },
      error: (error) => {
        console.error('Error activating film', error);
        this.messageService.showMessage({
          type: 'error',
          text: 'Failed to activate film. Please try again.'
        });
      }
    });
  }

  deactivateFilm(id: number): void {
    this.filmService.deactivateFilm(id).subscribe({
      next: () => {
        this.messageService.showMessage({
          type: 'success',
          text: 'Film deactivated successfully!'
        });
        this.loadFilms();
      },
      error: (error) => {
        console.error('Error deactivating film', error);
        this.messageService.showMessage({
          type: 'error',
          text: 'Failed to deactivate film. Please try again.'
        });
      }
    });
  }

  getStateClass(state: string): string {
    switch (state) {
      case 'ACTIVE':
        return 'state-active';
      case 'INACTIVE':
        return 'state-inactive';
      default:
        return 'state-open';
    }
  }
}
