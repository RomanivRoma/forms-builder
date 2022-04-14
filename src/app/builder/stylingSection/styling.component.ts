import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { AfterContentInit, AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PortalBridgeService } from '../services/portal-bridge.service';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.css']
})
export class StylingComponent implements OnInit, AfterContentInit {
  activePortal = new Subject<TemplatePortal>()

  @ViewChild('elementPortal', {static: true}) elementPortal: TemplateRef<unknown>
  @ViewChild('formPortal', {static: true}) formPortal: TemplateRef<unknown>

  // selectedPortal: string
  portal$: Observable<TemplatePortal>

  constructor(private viewContainerRef: ViewContainerRef) { }
  
  setPortal(portal: TemplatePortal){
    this.activePortal.next(portal)
  }

  ngOnInit(): void {

  }
  ngAfterContentInit (): void{
  }
  onValChange(val: string){
    const portal = new TemplatePortal(val == 'form' ? this.formPortal : this.elementPortal, this.viewContainerRef)
    this.setPortal(portal)
  }

}
