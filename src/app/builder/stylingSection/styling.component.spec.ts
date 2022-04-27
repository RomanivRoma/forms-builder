import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { FormComponent } from './form/form.component';

import { StylingComponent } from './styling.component';

describe('StylingComponent', () => {
  let component: StylingComponent;
  let fixture: ComponentFixture<StylingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StylingComponent ],
      imports: [
        MatButtonToggleModule,
        StoreModule.forRoot({}),
        MatButtonToggleModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatIconModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#setPortal should set active portal', () => {
    const formPortal = new ComponentPortal(FormComponent) 

    component.setPortal('form')

    expect(component.selectedPortal).toEqual(formPortal)

  });
});
