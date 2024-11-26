import { Component } from '@angular/core';
import { SessionConfigurationService } from './session-configuratio.service';
import { SessionConfiguration } from './session-configuration.model';
@Component({
  selector: 'app-session-configuration',
  standalone: true,
  imports: [],
  templateUrl: './session-configuration.component.html',
  styleUrl: './session-configuration.component.scss',
})
export class SessionConfigurationComponent {
  constructor(
    private sessionConfigurationService: SessionConfigurationService
  ) {}

  get sessionConfiguration(): SessionConfiguration {
    return this.sessionConfigurationService.getSessionConfiguration();
  }
}
