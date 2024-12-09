import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>('http://127.0.0.1:5000/projects');
  }

  createProject(project: Project) {
    return this.http.post<Project>('http://127.0.0.1:5000/projects', project);
  }

  deleteProject(id: number) {
    return this.http.delete(`http://127.0.0.1:5000/projects/${id}`);
  }
}
