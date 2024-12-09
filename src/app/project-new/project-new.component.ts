import { Component, Output, EventEmitter } from '@angular/core';
import { Project } from '../projects/project.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-new.component.html',
  styleUrl: './project-new.component.scss',
})
export class ProjectNewComponent {
  @Output() createProject = new EventEmitter<Project>();
  @Output() closeModal = new EventEmitter<void>();
  enteredName = '';
  enteredGoal = '';
  enteredDetails = '';

  onCloseModal() {
    this.closeModal.emit();
  }

  onStopPropagation(event: Event) {
    event.stopPropagation();
  }

  onSubmit() {
    this.createProject.emit({
      name: this.enteredName,
      goal: this.enteredGoal,
      details: this.enteredDetails,
    });
  }

  onCancel() {
    this.onCloseModal();
  }
}
