import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DragDropService } from '../services/drag-drop.service';
import { SwitcherPortalService } from '../services/switcher-portal.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { formStyleValueChange } from '../actions/form.actions';

@Component({
  selector: 'app-styling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit {
  value: string;
  isDisabled: boolean;
  activePortal = new Subject<TemplatePortal>();
  innerWidth: number = window.innerWidth;
  innerHeight: number = window.innerHeight;
  @ViewChild('elementPortal', {static: true}) elementPortal: TemplateRef<unknown>;
  @ViewChild('formPortal', {static: true}) formPortal: TemplateRef<unknown>;

  portal$: Observable<TemplatePortal>;
  constructor(private viewContainerRef: ViewContainerRef,
              public switcherPortal: SwitcherPortalService,
              public dragDrop: DragDropService,
              private store: Store<AppState>) {
    this.dragDrop.elementDisablingChange
    .subscribe(val =>{ 
      const portal = new TemplatePortal(val ? this.formPortal : this.elementPortal, this.viewContainerRef)          
      if(!portal.templateRef) return
      this.value = val ? 'form' : 'element'
      this.setPortal(portal)
    });   
  }
  setPortal(portal: TemplatePortal){
    this.activePortal.next(portal)
  }
  ngOnInit(): void {
  }
  ngOnDestroy(){
    // this.dragDrop.elementDisablingChange.unsubscribe()
  }
  handleSelect($event: Event){
    const element = ($event.target as HTMLInputElement) 
    if(element.className.includes('delete')){
      this.handleRemoveComponent(this.dragDrop.currentSelectedElementIndex || 0)
      this.handleUnselect()
    }
    else if(element.className.includes('reset')){
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
  onValChange(val: string){
    const portal = new TemplatePortal(val == 'form' ? this.formPortal : this.elementPortal, this.viewContainerRef)
    this.setPortal(portal)
  }
  onTypeChange(type:string, val: string){
    if(val == 'auto'){
      const updated:any = {}
      updated[type] = val
      this.store.dispatch(formStyleValueChange({...this.dragDrop.formStyle.value, ...updated}))
    }
    
  }
}
