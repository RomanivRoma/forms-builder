import { TemplatePortal, Portal, ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  Subscription,
  takeUntil,
  skip,
  tap,
  map,
} from 'rxjs';
import { DragDropService } from '../services/drag-drop.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ElementComponent } from './element/element.component';
import { FormComponent } from './form/form.component';
import { ComponentStyle } from './enums/style-enum.model';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.scss'],
})
export class StylingComponent implements OnInit {
  public selectedPortal: ComponentPortal<ElementComponent | FormComponent>;
  public StyleEnum = ComponentStyle;
  private defaultComponentStyle: ComponentStyle = ComponentStyle.form;

  private formPortal: ComponentPortal<FormComponent>;
  private elementPortal: ComponentPortal<ElementComponent>;

  public value: Observable<ComponentStyle>;
  constructor(public dragDrop: DragDropService) {}

  ngOnInit(): void {
    this.elementPortal = new ComponentPortal(ElementComponent);
    this.formPortal = new ComponentPortal(FormComponent);

    this.value = this.dragDrop.elementDisablingChange.pipe(
      map((elIsDisabled: boolean) => {
        const val: ComponentStyle = elIsDisabled
          ? this.defaultComponentStyle
          : ComponentStyle.element;
        this.setPortal(val);
        return val;
      })
    );

  }
  setPortal(val: ComponentStyle) {
    switch (val) {
      case ComponentStyle.form:
        this.selectedPortal = this.formPortal;
        break;
      case ComponentStyle.element:
        this.selectedPortal = this.elementPortal;
        break;
    }
  }
  onValChange(val: ComponentStyle) {
    this.setPortal(val);
  }
}
