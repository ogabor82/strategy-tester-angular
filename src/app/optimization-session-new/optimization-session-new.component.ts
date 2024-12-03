import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-optimization-session-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './optimization-session-new.component.html',
  styleUrl: './optimization-session-new.component.scss',
})
export class OptimizationSessionNewComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() createSession = new EventEmitter<{
    name: string;
    details: string;
  }>();

  enteredName = '';
  enteredDetails = '';

  onCloseModal() {
    this.closeModal.emit();
  }

  onStopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    this.createSession.emit({
      name: this.enteredName,
      details: this.enteredDetails,
    });
  }
}
