import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeframeSetsComponent } from './timeframe-sets.component';

describe('TimeframeSetsComponent', () => {
  let component: TimeframeSetsComponent;
  let fixture: ComponentFixture<TimeframeSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeframeSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeframeSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
