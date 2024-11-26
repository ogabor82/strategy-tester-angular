import { Component } from '@angular/core';
import { SessionConfigurationService } from './session-configuratio.service';
import { SessionConfiguration } from './session-configuration.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-session-configuration',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
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
