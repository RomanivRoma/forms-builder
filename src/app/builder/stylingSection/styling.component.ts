import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import {ChangeDetectionStrategy, SimpleChanges, AfterContentInit, AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, OnChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import { DragDropService } from '../services/drag-drop.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-styling',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit, AfterContentInit, OnChanges {
  formStyle: FormGroup = new FormGroup({
    title: new FormControl(''),
    fontSize: new FormControl(''),
    fontColor: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
  });
  activePortal = new Subject<TemplatePortal>();
  selectedStyle: string;
  @ViewChild('elementPortal', {static: true}) elementPortal: TemplateRef<unknown>;
  @ViewChild('formPortal', {static: true}) formPortal: TemplateRef<unknown>;

  portal$: Observable<TemplatePortal>;

  constructor(private viewContainerRef: ViewContainerRef) {
                this.selectedStyle = 'form'
               }
  
  setPortal(portal: TemplatePortal){
    this.activePortal.next(portal)
  }

  ngOnInit(): void {
    const portal = new TemplatePortal( this.formPortal, this.viewContainerRef)
    this.setPortal(portal)
  }
  ngAfterContentInit (): void{
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
  onValChange(val: string){
    const portal = new TemplatePortal(val == 'form' ? this.formPortal : this.elementPortal, this.viewContainerRef)
    this.setPortal(portal)
  }
}
