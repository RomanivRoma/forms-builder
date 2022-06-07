import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { StoreModule } from '@ngrx/store';
import { DropComponent } from '../dropSection/drop.component';
import { FormComponent } from '../stylingSection/form/form.component';
import { ConnectFormDirective } from './connect-form.directive';

describe('ConnectFormDirective', () => {
  let fixture: ComponentFixture<FormComponent>;
  let component: FormComponent;

  beforeEach(() => {
    const directiveSpy = jasmine.createSpyObj('FormGroupDirective', ['form', 'addControl']);
    fixture = TestBed.configureTestingModule({
      declarations: [
        ConnectFormDirective,
        FormComponent,
      ],
      imports: [
        MatButtonToggleModule,
        StoreModule.forRoot({})
      ],
      providers: [
        {provide: FormGroupDirective, useValue: directiveSpy}
      ]
    })
    .createComponent(FormComponent)
  
    // formFixture.detectChanges(); // initial binding
  
    // des = fixture.debugElement.queryAll(By.directive(HighlightDirective));
  });
  
  it('should return state on change', () => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;

    //mock parent formGroup
    const mockFormGroup: FormGroup = new FormGroup({
    });

    //dummy formgroupDirective to avoid undefined addControl function
    const formGroupDirective: FormGroupDirective = new FormGroupDirective([], []);
    
    component.formStyle  = mockFormGroup;
  });
});
