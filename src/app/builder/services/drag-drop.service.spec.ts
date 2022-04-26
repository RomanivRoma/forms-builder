import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragElement } from 'src/app/interfaces/DragElement.interface';
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
    service.addToForm(item)
    service.clearForm()
    expect(service.addedComponentList).toEqual([])
  });
  it('#addToForm should add to an array passed item', () => {
    service.addToForm(item)

    expect(service.addedComponentList[0]).toEqual(item)
  });

  it('#setSelectedElement should select element', () => {
    service.setSelectedElement(item)

    // expect(service.selectedElementObject).toEqual(item)
    // expect(service.selectedElementId).toEqual(item.id || 0)
  })

});
