import { Component, inject, Input } from '@angular/core';
import { Timeframe } from '../timeframe-sets/timeframe-set.model';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SessionConfigurationService } from '../session-configuration/session-configuration.service';

@Component({
  selector: 'app-timeframe-editor',
  standalone: true,
  imports: [
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './timeframe-editor.component.html',
  styleUrl: './timeframe-editor.component.scss',
})
export class TimeframeEditorComponent {
  sessionConfigurationService = inject(SessionConfigurationService);
  @Input() timeframe: Timeframe = {
    start: '',
    end: '',
    name: '',
    interval: '',
  };

  ngOnInit() {
    this.timeframe = this.timeframe || { start: '', end: '' };
  }

  saveTimeframe() {
    console.log(this.timeframe);
    this.sessionConfigurationService.setTimeframe(this.timeframe);
  }
}
