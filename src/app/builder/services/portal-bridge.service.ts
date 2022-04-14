import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortalBridgeService {

  private activePortal = new Subject<TemplatePortal>()
  readonly portal$ = this.activePortal.asObservable()

  constructor() { }
 
  setPortal(portal: TemplatePortal){
    this.activePortal.next(portal)
  }
}
