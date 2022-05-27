import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { Form } from '../models/form.model';
import { Element } from '../models/element.model';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';
import { Indent } from 'src/app/interfaces/indent.interface';
import { ElementStyle } from 'src/app/interfaces/element-style.interface';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Alignment } from 'src/app/enums/alignment.model';
import { ParentElementStyle } from 'src/app/interfaces/parent-element-style.interface';
import { ComponentTag } from 'src/app/enums/component-tag.model';
@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropComponent implements OnInit, AfterViewInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  @ViewChild('mainForm', { static: true }) formRef: ElementRef;
  public formStyle$: Observable<Form>;
  private destroy$: Subject<boolean> = new Subject();
  public addedComponentList$: Observable<DragElement[]>;
  public addedComponentList: DragElement[];
  public selectedElementId: number | null;
  public selectedElementId$: Observable<number | null>;
  public eComponentTag = ComponentTag;
  constructor(
    public dragDrop: DragDropService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formStyle$ = this.store.select('form').pipe(map((form: Form) => form));

    this.store
      .select('element')
      .pipe(takeUntil(this.destroy$))
      .subscribe((element: Element) => {
        const style: ElementStyle = {
          fontSize: element.fontSize,
          color: element.color,
          fontWeight: element.fontWeight,
          width: element.width,
          height: element.height,
          align: element.align,
          background: element.background,
          borderRadius: element.borderRadius,
          borderColor: element.borderColor,
          padding: element.padding,
          margin: element.margin,
        };
        const parentStyle: ParentElementStyle = {
          width: element.containerWidth!,
          justifyContent: element.justifyContent!,
        };
        const elementObject: DragElement = {
          required: element.required,
          label: element.label,
          placeholder: element.placeholder,
          value: element.value,
          style,
          parentStyle,
          options: element.options,
        };
        this.dragDrop.setSelectedElement(elementObject);
      });

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
  setVisibleInputs(component: DragElement): VisibleControls {
    return this.dragDrop.setFormControlVisibleChange(component);
  }
  setCurrentStylesToElement(component: DragElement) {
    console.log(component);
    
    const elementStyle: Element = {
      margin: component.style?.margin!,
      padding: component.style?.padding!,

      color: component.style?.color!,

      fontWeight: component.style?.fontWeight!,

      fontSize: component.style?.fontSize!,

      background: component.style?.background!,

      borderColor: component.style?.borderColor!,
      borderRadius: component.style?.borderRadius!,

      width: component.style?.width!,
      height: component.style?.height!,

      align: component.style?.align!,

      label: component?.label!,
      placeholder: component?.placeholder!,
      value: component?.value!,
      required: component?.required!,
      containerWidth: component.parentStyle?.width!,
      justifyContent: component.parentStyle?.justifyContent!,
      options: component?.options!,
    };

    const options: FormArray = this.dragDrop.elementStyle.get(
      'options'
    ) as FormArray;
    options.clear();
    component.options?.forEach((el) => {
      const optionForm: FormGroup = new FormGroup({
        option: new FormControl(el),
      });
      options.push(optionForm);
    });
    console.log(elementStyle);
    this.dragDrop.elementStyle.patchValue(elementStyle);
  }
  pxStringToInt(str: string): number {
    return +str.replace(/\D/g, '');
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
