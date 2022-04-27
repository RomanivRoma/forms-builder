import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropItemComponent } from './drop-item.component';

describe('DropItemComponent', () => {
  let component: DropItemComponent;
  let fixture: ComponentFixture<DropItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
