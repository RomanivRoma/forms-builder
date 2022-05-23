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
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../../services/drag-drop.service';

import { ElementComponent } from './element.component';

describe('ElementComponent', () => {
  let component: ElementComponent;
  let fixture: ComponentFixture<ElementComponent>;
  let dragDropSerive: jasmine.SpyObj<DragDropService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementComponent ],
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
        ReactiveFormsModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementComponent);
    component = fixture.componentInstance;
    dragDropSerive = jasmine.createSpyObj<DragDropService>(['getAddedComponents', 'getSelectedElementId'])
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('#handleRemoveComponent should remove element', () => {
    expect(component.handleRemoveElement()).toBeFalsy();
    dragDropSerive.getSelectedElementId.and.returnValue(of(null));
    dragDropSerive.getAddedComponents.and.returnValue(of([]));
    component.handleRemoveElement()
    dragDropSerive.getSelectedElementId()
    .subscribe(id =>{
      expect(id).toBeFalsy(null)
    })
    dragDropSerive.getAddedComponents()
    .subscribe(elements =>{
      expect(elements).toEqual([])
    })
  });
});
