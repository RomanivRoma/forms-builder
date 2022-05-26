import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { ComponentTag } from 'src/app/enums/component-tag.model';
import { InputType } from 'src/app/enums/input-type.model';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../services/drag-drop.service';

import { DropComponent } from './drop.component';

describe('DropComponent', () => {
  let component: DropComponent;
  let fixture: ComponentFixture<DropComponent>;
  let item: DragElement;

  beforeEach(async () => {
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: ComponentTag.select,
      placeholder: 'Placeholer',
      type: InputType.text,
    };

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
    } as VisibleControls);
  });

  it('#handleSelect should select or unselect element', () => {
    // dragDropSerive.getAddedComponents.and.returnValue(of([item]))
    // dragDropSerive.getSelectedElementId.and.returnValue(new BehaviorSubject<number | null>(1))
    component.handleSelect(item)
    expect(component.selectedElementId).toBe(item.id || null)
    component.handleSelect(item)
    expect(component.selectedElementId).toBe(null)
 
    // dragDropSerive.getSelectedElementId()
    // .subscribe(id =>{
    //   expect(id).toBe(item.id || null)
    // })
  });


});
