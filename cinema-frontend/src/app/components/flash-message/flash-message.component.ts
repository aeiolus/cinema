import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="message$ | async as message" 
         class="flash-message" 
         [ngClass]="message.type">
      {{ message.text }}
    </div>
  `,
  styles: [`
    .flash-message {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      text-align: center;
      min-width: 200px;
    }

    @keyframes slideIn {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }

    .success {
      background-color: #4caf50;
    }

    .error {
      background-color: #f44336;
    }

    .info {
      background-color: #2196f3;
    }
  `]
})
export class FlashMessageComponent implements OnInit {
  message$ = this.messageService.message$;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}
}
