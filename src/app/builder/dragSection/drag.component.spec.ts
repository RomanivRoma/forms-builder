import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { DragDropService } from '../services/drag-drop.service';
import { DragComponent } from './drag.component';

describe('DragComponent', () => {
  let component: DragComponent;
  let fixture: ComponentFixture<DragComponent>;
  let dragDrop: DragDropService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragComponent ],
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        {provide: DragDropService, useValue: {
          params: ''
        }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragComponent);
    component = fixture.componentInstance;
    dragDrop = fixture.debugElement.injector.get(DragDropService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
});
