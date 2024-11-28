import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BacktestSession } from '../backtest-sessions/backtest-session.model';

@Component({
  selector: 'app-backtest-session-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './backtest-session-delete.component.html',
  styleUrl: './backtest-session-delete.component.scss',
})
export class BacktestSessionDeleteComponent {
  @Input() session: BacktestSession | undefined;
  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteSession = new EventEmitter<BacktestSession>();

  onStopPropagation(event: Event) {
    event.stopPropagation();
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.session) {
      this.deleteSession.emit(this.session);
    }
  }
}
