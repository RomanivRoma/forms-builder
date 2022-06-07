import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';

import { IndentInputComponent } from './indent-input.component';

describe('IndentInputComponent', () => {
  let component: IndentInputComponent;
  let fixture: ComponentFixture<IndentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ReactiveComponentModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
      ],
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
