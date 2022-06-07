import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlignInputComponent } from './align-input.component';

describe('JustifyInputComponent', () => {
  let component: AlignInputComponent;
  let fixture: ComponentFixture<AlignInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlignInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlignInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
