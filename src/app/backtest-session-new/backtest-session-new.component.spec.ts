import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktestSessionNewComponent } from './backtest-session-new.component';

describe('BacktestSessionNewComponent', () => {
  let component: BacktestSessionNewComponent;
  let fixture: ComponentFixture<BacktestSessionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacktestSessionNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacktestSessionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
