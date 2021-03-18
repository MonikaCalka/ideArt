import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardInspirationComponent } from './standard-inspiration.component';

describe('StandardInspirationComponent', () => {
  let component: StandardInspirationComponent;
  let fixture: ComponentFixture<StandardInspirationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardInspirationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardInspirationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
