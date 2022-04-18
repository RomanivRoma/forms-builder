import { Injectable, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitcherPortalService {
  elementPortal: TemplateRef<unknown>;
  formPortal: TemplateRef<unknown>;

  constructor() { }

}
