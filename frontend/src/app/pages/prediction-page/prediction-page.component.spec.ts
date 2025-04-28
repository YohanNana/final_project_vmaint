import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionPageComponent } from './prediction-page.component';

describe('PredictionPageComponent', () => {
  let component: PredictionPageComponent;
  let fixture: ComponentFixture<PredictionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PredictionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PredictionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
