import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SessionConfigurationComponent } from './session-configuration/session-configuration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MenuComponent, RouterOutlet, SessionConfigurationComponent],
})
export class AppComponent {
  title = 'Dashboard';
}
