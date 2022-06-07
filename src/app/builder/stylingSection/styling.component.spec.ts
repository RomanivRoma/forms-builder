import { ComponentPortal } from '@angular/cdk/portal';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreModule } from '@ngrx/store';
import { ComponentStyle } from 'src/app/enums/style-enum.model';
import { ElementComponent } from './element/element.component';
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
        ReactiveComponentModule,
        StoreModule.forRoot({}),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('#setPortal should set active portal', async () => {
    const formPortal = new ComponentPortal(FormComponent) 
    const elementPortal = new ComponentPortal(ElementComponent) 
    component.setPortal(ComponentStyle.form)
    expect(component.selectedPortal).toEqual(formPortal)
    component.setPortal(ComponentStyle.element)
    expect(component.selectedPortal).toEqual(elementPortal)
  });
});
