import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { DragItemComponent } from './drag-item.component';

describe('DragItemComponent', () => {
  let component: DragItemComponent;
  let fixture: ComponentFixture<DragItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    fixture = TestBed.createComponent(DragItemComponent);
    spyOn(component.onAdd, 'emit');
    const item = {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'p',
      type: 'text',
      class: 'custom-text',
      value: 'Text',
    }
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.add__button');
    button.click();
    
    expect(component.onAdd.emit).toHaveBeenCalledWith(item);
  });
});
