import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface FlashMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<FlashMessage | null>(null);
  message$: Observable<FlashMessage | null> = this.messageSubject.asObservable();

  showMessage(message: FlashMessage, duration: number = 3000): void {
    this.messageSubject.next(message);
    setTimeout(() => {
      this.clearMessage();
    }, duration);
  }

  clearMessage(): void {
    this.messageSubject.next(null);
  }

  showSuccess(message: string): void {
    this.showMessage({ type: 'success', text: message });
  }

  showError(message: string): void {
    this.showMessage({ type: 'error', text: message });
  }
}
