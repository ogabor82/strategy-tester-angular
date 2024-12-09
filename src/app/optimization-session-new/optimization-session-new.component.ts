import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../projects/projects.service';
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
    project_id?: number;
  }>();

  projectService = inject(ProjectsService);

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
