import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../projects/projects.service';
@Component({
  selector: 'app-backtest-session-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './backtest-session-new.component.html',
  styleUrl: './backtest-session-new.component.scss',
})
export class BacktestSessionNewComponent {
  projectService = inject(ProjectsService);
  @Output() closeModal = new EventEmitter<void>();
  @Output() createSession = new EventEmitter<{
    name: string;
    details: string;
    project_id?: number;
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
      project_id: this.projectService.selectedProject()?.id,
    });
  }
}
