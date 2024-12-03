import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptimizationSession } from '../optimization-sessions/optimization-session.model';

@Component({
  selector: 'app-optimization-session-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './optimization-session-delete.component.html',
  styleUrl: './optimization-session-delete.component.scss',
})
export class OptimizationSessionDeleteComponent {
  @Input() session: OptimizationSession | undefined;
  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteSession = new EventEmitter<OptimizationSession>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onStopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    if (this.session) {
      this.deleteSession.emit(this.session);
    }
  }
}
