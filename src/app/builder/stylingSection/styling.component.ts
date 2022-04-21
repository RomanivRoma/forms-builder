import { TemplatePortal, Portal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription, takeUntil, skip } from 'rxjs';
import { DragDropService } from '../services/drag-drop.service';
import { SwitcherPortalService } from '../services/switcher-portal.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css'],
})
export class StylingComponent implements OnInit {
  value: string;
  isDisabled: boolean;
  selectedPortal: Portal<any>;
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;
  @ViewChild('elementPortal', {static: true}) elementPortalContent: TemplateRef<unknown>;
  @ViewChild('formPortal', {static: true}) formPortalContent: TemplateRef<unknown>;
  formPortal: TemplatePortal<any>;
  elementPortal: TemplatePortal<any>;
  isFormControlVisible: any;
  destroy$: Subject<boolean> = new Subject();
  constructor(private viewContainerRef: ViewContainerRef,
              public switcherPortal: SwitcherPortalService,
              public dragDrop: DragDropService) {
  
  }
  ngOnInit(): void {
    this.dragDrop.elementDisablingChange
    .pipe(
      takeUntil(this.destroy$), 
      skip(1)
    )
    .subscribe(val =>{
      this.value = val ? 'form' : 'element'
      this.setPortal(this.value)
    });   
    this.dragDrop.formControlVisibleChange
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(val =>{
      this.isFormControlVisible = val
    })
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.complete()
  }
  ngAfterViewInit() {
    this.elementPortal = new TemplatePortal(this.elementPortalContent, this.viewContainerRef);
    this.formPortal = new TemplatePortal(this.formPortalContent, this.viewContainerRef);
  }
  handleSelect($event: Event){
    const element = ($event.target as HTMLInputElement) 
    if(element.className.includes('delete')){
      this.handleRemoveComponent(this.dragDrop.currentSelectedElementIndex || 0)
      this.handleUnselect()
    }
    else if(element.className.includes('confirm')){
      this.handleUnselect()
    }
  }
  handleRemoveComponent(index: number){
    this.dragDrop.addedComponentList.splice(index, 1);
  }
  handleUnselect(){
    this.dragDrop.setSelectedElement(null, null)
  }
  handleDownload(){
    this.dragDrop.download('form.html')
  }
  handleClear(){
    this.dragDrop.clearForm()
  }
  setPortal(val: string){
    this.selectedPortal = val == 'form' ? this.formPortal : this.elementPortal
  }
  onValChange(val: string){
    this.setPortal(val)
  }
}
