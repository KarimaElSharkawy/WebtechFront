import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EintraegeComponent } from './eintraege.component';

describe('EintraegeComponent', () => {
  let component: EintraegeComponent;
  let fixture: ComponentFixture<EintraegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EintraegeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EintraegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
