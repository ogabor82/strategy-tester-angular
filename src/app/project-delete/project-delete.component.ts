import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from '../projects/project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-delete',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-delete.component.html',
  styleUrl: './project-delete.component.scss',
})
export class ProjectDeleteComponent {
  @Input() project: Project | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() deleteProject = new EventEmitter<Project>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onConfirmDelete() {
    if (!this.project) return;
    this.deleteProject.emit(this.project);
  }

  onStopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    this.onConfirmDelete();
  }
}
