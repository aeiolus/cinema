import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShowtimeService } from '../services/showtime.service';
import { Showtime } from '../models/showtime.model';
import { MessageService } from '../services/message.service';

@Component({
    selector: 'app-showtimes',
    templateUrl: './showtimes.component.html',
    styleUrls: ['./showtimes.component.scss'],
    standalone: true,
    imports: [CommonModule, MatTabsModule, MatTableModule, MatIconModule, MatButtonModule]
})
export class ShowtimesComponent implements OnInit {
    showtimes: Showtime[] = [];
    availableDates: Date[] = [];
    displayedColumns: string[] = ['image', 'title', 'time'];

    constructor(
        private showtimeService: ShowtimeService,
        private messageService: MessageService
    ) {
        // Generate dates for the next 7 days
        const now = new Date();
        this.availableDates = Array.from({length: 7}, (_, i) => {
            const date = new Date();
            date.setDate(now.getDate() + i);
            return date;
        });
    }

    ngOnInit(): void {
        this.loadShowtimes(this.availableDates[0]);
    }

    onDateChange(index: number): void {
        this.loadShowtimes(this.availableDates[index]);
    }

    loadShowtimes(date: Date): void {
        const formattedDate = this.formatDate(date);
        this.showtimeService.getShowtimesByDate(formattedDate).subscribe({
            next: (showtimes) => {
                this.showtimes = showtimes;
            },
            error: (error) => {
                this.messageService.showError('Failed to load showtimes');
                console.error('Error loading showtimes:', error);
            }
        });
    }

    formatTabDate(date: Date): string {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    private formatDate(date: Date): string {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    formatTime(dateString: string): string {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}
