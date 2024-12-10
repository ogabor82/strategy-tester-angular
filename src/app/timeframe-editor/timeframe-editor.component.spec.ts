import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeEditorComponent } from './timeframe-editor.component';

describe('TimeframeEditorComponent', () => {
  let component: TimeframeEditorComponent;
  let fixture: ComponentFixture<TimeframeEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeframeEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeframeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
