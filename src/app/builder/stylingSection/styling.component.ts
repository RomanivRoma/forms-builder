import { TemplatePortal, Portal, ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription, takeUntil, skip } from 'rxjs';
import { DragDropService } from '../services/drag-drop.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ElementComponent } from './element/element.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css'],
})
export class StylingComponent implements OnInit {
  value: string;
  selectedPortal: Portal<any>;
  formPortal: ComponentPortal<FormComponent>;
  elementPortal: ComponentPortal<ElementComponent>;
  destroy$: Subject<boolean> = new Subject();

  constructor(public dragDrop: DragDropService) { }

  ngOnInit(): void {
    this.dragDrop.elementDisablingChange
    .pipe(
      takeUntil(this.destroy$), 
      skip(1)
    )
    .subscribe(val =>{
      this.value = val  ? 'form' : 'element'
      this.setPortal(this.value)
    });   
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
  ngAfterViewInit() {
    this.elementPortal = new ComponentPortal(ElementComponent);
    this.formPortal = new ComponentPortal(FormComponent);
  }
  
  setPortal(val: string){
    this.selectedPortal = val == 'form' ? this.formPortal : this.elementPortal
  }
  onValChange(val: string){
    this.setPortal(val)
  }
}
