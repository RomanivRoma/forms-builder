import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragDropService } from './drag-drop.service';

describe('DragDropService', () => {
  let service: DragDropService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ]
    });
    service = TestBed.inject(DragDropService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#clearForm should clear array of form elements', () => {
    // expect(service).toBeTruthy();
    expect(service.addedComponentList).toBe
  });
});
