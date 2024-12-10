import { Component, DestroyRef, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from './project.model';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { ProjectsService } from './projects.service';
import { ProjectNewComponent } from '../project-new/project-new.component';
import { ProjectDeleteComponent } from '../project-delete/project-delete.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterLink,
    ProjectNewComponent,
    ProjectDeleteComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects = signal<Project[]>([]);
  isFetching = signal(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private projectsService = inject(ProjectsService);
  newDialogOpen = signal(false);
  deleteDialogOpen = signal(false);
  selectedProjectToDelete = signal<Project | null>(null);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<Project[]>('http://127.0.0.1:5000/projects')
      .subscribe({
        next: (data) => {
          this.projects.set(data);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error) => {
          console.error(error);
          this.isFetching.set(false);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  newProject() {
    this.newDialogOpen.set(true);
  }

  createProject(project: Project) {
    this.projectsService.createProject(project).subscribe({
      next: (data) => {
        this.projects.set([...this.projects(), data]);
      },
      complete: () => {
        this.closeNewDialog();
      },
    });
  }

  closeNewDialog() {
    this.newDialogOpen.set(false);
  }

  openDeleteDialog(project: Project) {
    this.deleteDialogOpen.set(true);
    this.selectedProjectToDelete.set(project);
  }

  closeDeleteDialog() {
    this.deleteDialogOpen.set(false);
    this.selectedProjectToDelete.set(null);
  }

  deleteProject(project: Project) {
    if (!project.id) return;
    this.projectsService.deleteProject(project.id).subscribe({
      next: () => {
        this.projects.set(this.projects().filter((p) => p.id !== project.id));
      },
      complete: () => {
        this.closeDeleteDialog();
      },
    });
  }

  selectProject(project: Project) {
    this.projectsService.setSelectedProject(project);
  }

  get selectedProject() {
    return this.projectsService.getSelectedProject();
  }
}
