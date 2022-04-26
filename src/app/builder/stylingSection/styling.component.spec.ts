import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
        StoreModule.forRoot({})
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
