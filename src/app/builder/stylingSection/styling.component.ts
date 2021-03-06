import { ComponentPortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DragDropService } from '../services/drag-drop.service';
import { ElementComponent } from './element/element.component';
import { FormComponent } from './form/form.component';
import { ComponentStyle } from '../../enums/style-enum.model';

@Component({
  selector: 'app-styling',
  templateUrl: './styling.component.html',
  styleUrls: ['./styling.component.scss'],
})
export class StylingComponent {
  public selectedPortal: ComponentPortal<ElementComponent | FormComponent>;
  public eComponentStyle = ComponentStyle;
  private defaultComponentStyle: ComponentStyle = ComponentStyle.form;

  private formPortal: ComponentPortal<FormComponent>;
  private elementPortal: ComponentPortal<ElementComponent>;

  public value: Observable<ComponentStyle>;

  constructor(public dragDrop: DragDropService) {}

  public ngOnInit(): void {
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

  public setPortal(val: ComponentStyle): void {
    switch (val) {
      case ComponentStyle.form:
        this.selectedPortal = this.formPortal;
        break;
      case ComponentStyle.element:
        this.selectedPortal = this.elementPortal;
        break;
    }
  }

  public onValChange(val: ComponentStyle): void {
    this.setPortal(val);
  }
}
