import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { DragItemComponent } from './drag-item.component';

describe('DragItemComponent', () => {
  let component: DragItemComponent;
  let fixture: ComponentFixture<DragItemComponent>;
  let de: DebugElement;
  let button: ElementRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragItemComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    button = de.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when button is clicked', () => {
    spyOn(component.onAdd, 'emit');
    button.nativeElement.click();
    expect(component.onAdd.emit).toHaveBeenCalledWith(component.component);
  });

});
