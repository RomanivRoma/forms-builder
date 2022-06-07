import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ComponentTag } from 'src/app/enums/component-tag.model';
import { InputType } from 'src/app/enums/input-type.model';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../../services/drag-drop.service';
import { AlignInputComponent } from '../align-input/align-input.component';
import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let dragDropSerive: jasmine.SpyObj<DragDropService>;
  let item: DragElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent, AlignInputComponent],
      imports: [
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
        FormsModule,
        ReactiveFormsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    dragDropSerive = jasmine.createSpyObj<DragDropService>([
      'getAddedComponents',
      'getSelectedElementId',
    ]);
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: ComponentTag.select,
      placeholder: 'Placeholer',
      type: InputType.text,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#handleClear should clear form', () => {
    dragDropSerive.getAddedComponents.and.returnValue(of([]));
    component.handleClear();
    dragDropSerive.getAddedComponents().subscribe((elements) => {
      expect(elements).toEqual([]);
    });
  });
});
