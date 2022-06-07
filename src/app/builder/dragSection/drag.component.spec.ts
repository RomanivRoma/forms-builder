import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { ComponentTag } from 'src/app/enums/component-tag.model';
import { InputType } from 'src/app/enums/input-type.model';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../services/drag-drop.service';
import { DragComponent } from './drag.component';

describe('DragComponent', () => {
  let component: DragComponent;
  let fixture: ComponentFixture<DragComponent>;
  let item: DragElement;
  let dragDropSerive: jasmine.SpyObj<DragDropService>;

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      declarations: [ DragComponent ],
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: ComponentTag.select,
      placeholder: 'Placeholer',
      type: InputType.text,
    };
    dragDropSerive = jasmine.createSpyObj<DragDropService>(['getAddedComponents', 'getSelectedElementId'])
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('#handleAdd should add element', () => {
    dragDropSerive.getAddedComponents.and.returnValue(of([item]));
    expect(component.handleAdd(item)).toEqual(item)
    dragDropSerive.getAddedComponents()
    .subscribe(elements =>{
      expect(elements).toEqual([item])
    })
  });
    
});
