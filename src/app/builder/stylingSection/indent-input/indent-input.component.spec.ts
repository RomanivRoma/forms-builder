import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndentInputComponent } from './indent-input.component';

describe('IndentInputComponent', () => {
  let component: IndentInputComponent;
  let fixture: ComponentFixture<IndentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndentInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
