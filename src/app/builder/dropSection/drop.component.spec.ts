import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../services/drag-drop.service';

import { DropComponent } from './drop.component';

describe('DropComponent', () => {
  let component: DropComponent;
  let fixture: ComponentFixture<DropComponent>;
  let item: DragElement;

  beforeEach(async () => {
    const dragDropSerive = jasmine.createSpyObj<DragDropService>(['getAddedComponents'])
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
    };
    dragDropSerive.getAddedComponents.and.returnValue(of([item]))
    await TestBed.configureTestingModule({
      declarations: [ DropComponent ],
      imports: [
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('#setVisibleInputs should set of visible inputs', () => {
    expect(component.setVisibleInputs(item)).toEqual({
      placeholder: false,
      required: true,
      value: false,
      borderRadius: true,
      borderColor: true,
      label: false
    });
  });


});
