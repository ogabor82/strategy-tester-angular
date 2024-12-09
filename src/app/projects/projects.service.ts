import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  selectedProject = signal<Project | null>(null);

  constructor(private http: HttpClient) {
    const selectedProject = localStorage.getItem('selectedProject');
    if (selectedProject) {
      this.selectedProject.set(JSON.parse(selectedProject));
    }
  }

  saveSelectedProject() {
    localStorage.setItem(
      'selectedProject',
      JSON.stringify(this.selectedProject())
    );
  }

  getProjects() {
    return this.http.get<Project[]>('http://127.0.0.1:5000/projects');
  }

  createProject(project: Project) {
    return this.http.post<Project>('http://127.0.0.1:5000/projects', project);
  }

  deleteProject(id: number) {
    return this.http.delete(`http://127.0.0.1:5000/projects/${id}`);
  }

  setSelectedProject(project: Project) {
    this.selectedProject.set(project);
    this.saveSelectedProject();
  }

  getSelectedProject() {
    return this.selectedProject();
  }
}
