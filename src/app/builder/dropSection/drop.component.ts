import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DragElement } from '../../interfaces/drag-element.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil, Subject, map, Observable, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { DragDropService } from '../services/drag-drop.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Form } from '../models/form.model';
import { Element } from '../models/element.model';
import { isEmpty } from 'lodash-es';
import { Indent } from 'src/app/interfaces/indent.interface';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropComponent implements OnInit, AfterViewInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild('mainForm', { static: true }) formRef: ElementRef;
  public formStyle$: Observable<any>;
  private destroy$: Subject<boolean> = new Subject();
  public addedComponentList$: Observable<DragElement[]>;
  public addedComponentList: DragElement[];
  public selectedElementId: number | null;
  public selectedElementId$: Observable<number | null>;
  constructor(
    public dragDrop: DragDropService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formStyle$ = this.store.select('form').pipe(
      map((form: Form) => {
        return {
          title: form.title,
          titleStyle: {
            'fontSize.px': form.fontSize,
            color: form.fontColor,
            textAlign: form.align,
          },
          formStyle: {
            'width.px': form.width,
            'height.px': form.height,
          },
          headerStyle: {
            backgroundColor: form.background,
          },
        };
      })
    );

    this.store
      .select('element')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (element: Element) => {
          console.log(element);
          const elementObject: DragElement = {
            required: element.required,
            label: element.label,
            placeholder: element.placeholder,
            value: element.value,
            // style,
            // parentStyle,
            options: element.options,
          };

          this.dragDrop.setSelectedElement(elementObject);
        } 
      );

    this.addedComponentList$ = this.dragDrop
      .getAddedComponents()
      .pipe(tap((elements) => (this.addedComponentList = elements)));

    this.selectedElementId$ = this.dragDrop.getSelectedElementId().pipe(
      map((id) => {
        this.selectedElementId = id;
        return id;
      })
    );
  }
  ngAfterViewInit(): void {
    this.dragDrop.setForm(this.formRef);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  drop(event: CdkDragDrop<DragElement[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const componentList = this.addedComponentList;
      const addedElement = componentList[event.currentIndex];
      componentList[event.currentIndex] = {
        ...addedElement,
        id: this.dragDrop.id++,
      };
    }
  }
  setVisibleInputs(component: DragElement) {
    return this.dragDrop.setFormControlVisibleChange(component);
  }
  setCurrentStylesToElement(component: DragElement) {
    // let elementStyle: any = {};
    // console.log(component);
    
    // Object.keys(component?.style || []).forEach((el) => {
    //   const splittedStyle = el.split('.');
    //   elementStyle[splittedStyle.length > 1 ? splittedStyle[0] : el] =
    //     component.style[el];
      
    // });
    // const margin: Indent = {
    //   top: +elementStyle['marginTop'],
    //   right: +elementStyle['marginRight'],
    //   bottom: +elementStyle['marginBottom'],
    //   left: +elementStyle['marginLeft']
    // };
    // const padding: Indent = {
    //   top: +elementStyle['paddingTop'],
    //   right: +elementStyle['paddingRight'],
    //   bottom: +elementStyle['paddingBottom'],
    //   left: +elementStyle['paddingLeft']
    // };
    // elementStyle = {
    //   ...elementStyle,
    //   margin,
    //   padding,
    //   label: component?.label || '',
    //   placeholder: component?.placeholder || '',
    //   value: component?.value || '',
    //   required: component?.required || false,
    //   containerWidth: component.parentStyle?.width,
    //   justifyContent: component.parentStyle?.justifyContent,
    //   options: component?.options,
    // };

    // const options = this.dragDrop.elementStyle.get('options') as FormArray;
    // options.clear();
    // component.options?.forEach((el) => {
    //   const optionForm = new FormGroup({
    //     option: new FormControl(el),
    //   });
    //   options.push(optionForm);
    // });
    // this.dragDrop.elementStyle.patchValue(elementStyle);
  }

  handleSelect(component: DragElement) {
    if (component.id == this.selectedElementId) {
      this.dragDrop.unselectElement();
      return;
    }
    this.dragDrop.selectElement(component);
    this.setCurrentStylesToElement(component);
    this.setVisibleInputs(component);
  }
  identify(index: number, item: DragElement) {
    return item.id;
  }
}
