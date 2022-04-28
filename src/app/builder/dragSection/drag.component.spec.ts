import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from '../services/drag-drop.service';
import { DragComponent } from './drag.component';

describe('DragComponent', () => {
  let component: DragComponent;
  let fixture: ComponentFixture<DragComponent>;
  let item: DragElement;
  const dragDropSerive = jasmine.createSpyObj<DragDropService>(['getAddedComponents', 'getSelectedElementId'])

  beforeEach(async () => {
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
    };

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
    dragDropSerive.getAddedComponents.and.returnValue(of([item]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('#handleAdd should add element', () => {
    expect(component.handleAdd(item)).toEqual(item)
    dragDropSerive.getAddedComponents()
    .subscribe(elements =>{
      expect(elements).toEqual([item])
    })
  });
    
});
