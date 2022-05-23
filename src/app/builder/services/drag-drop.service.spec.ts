import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { environment } from 'src/environments/environment';
import { DragDropService } from './drag-drop.service';

describe('DragDropService', () => {
  let service: DragDropService;
  let item: DragElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ]
    });
    service = TestBed.inject(DragDropService);
    item = {
      id: 1,
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#clearForm should clear array of form elements', () => {
    service.addElement(item)
    service.clearForm()
    service.getAddedComponents()
    .subscribe(comp =>{
      expect(comp).toEqual([])
    })
  });
  it('#addElement should add to an array passed item', () => {
    service.addElement(item)

    service.getAddedComponents()
    .subscribe(comp =>{
      expect(comp).toEqual([item])
    })
  });
  it('#removeElement should remove element by id', () => {
    service.addElement(item)
    service.removeElement(1)

    service.getAddedComponents()
    .subscribe(comp =>{
      expect(comp.length).toBeFalsy()
    })
  });
  
  it('#selectElement should select element', () => {
    expect(service.selectElement(item)).toEqual(item)
    service.getSelectedElementId()
    .subscribe(id =>{
      expect(id).toEqual(item.id || 0)

    })
  })
  it('#unselectElement should unselect element', () => {
    service.selectElement(item)
    service.unselectElement()
    service.getSelectedElementId()
    .subscribe(id =>{
      expect(id).toBeFalsy()
    })
  })

  it('#getAddedComponents should return subscription on added elements', () => {
    service.addElement(item)
    service.getAddedComponents()
    .subscribe(comp =>{
      expect(comp).toEqual([item])
    })
  })
  it('#setFormControlVisibleChange should return object of visible inputs', () => {

    expect(service.setFormControlVisibleChange(item)).toEqual({
      placeholder: false,
      required: true,
      value: false,
      borderRadius: true,
      borderColor: true,
      label: false
    })
  })
});
