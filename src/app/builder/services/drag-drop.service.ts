import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { saveAs } from 'file-saver';
import { DropComponent } from '../dropSection/drop.component';
import { ComponentTag } from 'src/app/enums/component-tag.model';
import { InputType } from 'src/app/enums/input-type.model';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';

@Injectable({
  providedIn: 'root',
})
export class DragDropService {
  @ViewChild(DropComponent, { static: true }) private formRef: ElementRef;
  public elementStyle: FormGroup = new FormGroup({
    placeholder: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    required: new FormControl(''),
    color: new FormControl(''),
    fontSize: new FormControl(''),
    fontWeight: new FormControl(''),
    borderColor: new FormControl(''),
    borderRadius: new FormControl(''),
    background: new FormControl(''),
    justifyContent: new FormControl(''),
    containerWidth: new FormControl(''),
    value: new FormControl(''),
    padding: new FormControl({ top: 0, right: 0, bottom: 0, left: 0 }),
    margin: new FormControl({ top: 5, right: 5, bottom: 5, left: 5 }),
    label: new FormControl(''),
    options: new FormArray([]),
  });
  public id: number = 1;
  public elementDisablingChange: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private selectedElementId: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);

  private formControlVisibleChange: BehaviorSubject<VisibleControls> =
    new BehaviorSubject<VisibleControls>({
      placeholder: true,
      required: true,
      value: true,
      borderRadius: true,
      borderColor: true,
      label: true,
      options: false,
    });
  private addedComponentList: BehaviorSubject<DragElement[]> =
    new BehaviorSubject<DragElement[]>([]);

  constructor() {}

  public selectElement(component: DragElement): DragElement {
    this.selectedElementId.next(component.id!);
    this.elementDisablingChange.next(false);
    return component;
  }
  public unselectElement(): void {
    this.selectedElementId.next(null);
    this.elementDisablingChange.next(true);
  }
  public setSelectedElement(element: DragElement): void {
    const componentList: DragElement[] = this.addedComponentList.getValue();
    let selectedElement: DragElement = componentList.find(
      (el) => el.id == this.selectedElementId.getValue()
    )!;
    selectedElement = { ...selectedElement, ...element };
    const newComponentList: DragElement[] = componentList.map((component) =>
      component.id == selectedElement?.id ? selectedElement : component
    );
    this.addedComponentList.next(newComponentList);
  }
  public setFormControlVisibleChange(component: DragElement): VisibleControls {
    let visibleInputs: VisibleControls = {} as VisibleControls;
    if (component.tag == ComponentTag.p) {
      visibleInputs = {
        placeholder: false,
        required: false,
        value: true,
        borderRadius: false,
        borderColor: false,
        label: false,
        options: false,
      };
    } else if (component.tag == ComponentTag.button) {
      visibleInputs = {
        placeholder: false,
        required: false,
        value: true,
        borderRadius: true,
        borderColor: true,
        label: false,
        options: false,
      };
    } else if (component.tag == ComponentTag.select) {
      visibleInputs = {
        placeholder: true,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: false,
        options: true,
      };
    } else if (
      component.type == InputType.radio ||
      component.type == InputType.checkbox
    ) {
      visibleInputs = {
        placeholder: false,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: true,
        options: false,
      };
    } else {
      visibleInputs = {
        placeholder: true,
        required: true,
        value: false,
        borderRadius: true,
        borderColor: true,
        label: false,
        options: false,
      };
    }
    this.formControlVisibleChange.next({ ...visibleInputs });
    return visibleInputs;
  }
  public getSelectedElementId(): Observable<number | null> {
    return this.selectedElementId.pipe(shareReplay());
  }
  public getFormControlVisibleChange(): Observable<VisibleControls> {
    return this.formControlVisibleChange.pipe(shareReplay());
  }
  public addElement(item: DragElement): DragElement {
    const addedElement = { id: this.id++, ...item };
    const componentList = this.addedComponentList.getValue();
    this.addedComponentList.next([...componentList, addedElement]);
    return addedElement;
  }
  public removeElement(id: number): void {
    const componentList = this.addedComponentList.getValue();
    this.addedComponentList.next(componentList.filter((el) => el.id != id));
  }
  public clearForm(): void {
    this.addedComponentList.next([]);
  }
  public setForm(form: ElementRef): void {
    this.formRef = form;
  }
  public getAddedComponents(): Observable<DragElement[]> {
    return this.addedComponentList.pipe(shareReplay());
  }
  get options() {
    return this.elementStyle.controls['options'] as FormArray;
  }
  public addOption(): void {
    const optionForm = new FormGroup({
      option: new FormControl(),
    });
    this.options.push(optionForm as FormGroup);
  }
  public deleteOption(optionIndex: number): void {
    this.options.removeAt(optionIndex);
  }
  public download(filename: string): void {
    const html = this.formRef.nativeElement;
    const style = `<style>
    .drop__container{
      border-radius: 5px;
      padding: 13px;
    }
    .drop__item__container {
      display: flex;
    }
    .drop__container .drop__header{
        background: rgb(19, 192, 13);
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    .drop__container p{
      margin: 0;
    }
    .drop__container .drop__header h1{
        margin: 0;
        padding: 15px;
        font-size: 29px;
    }
    .dragElements__item input,
    .dragElements__item textarea,
    .dragElements__item p,
    .dragElements__item select{
        margin: 5px;
    }
    .drop__container .drop__wrapper{
        border: 2px solid rgb(163, 163, 163);
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .drop__container .drop__body{
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
    }
    .drop__container .drop__footer{
        background: rgb(202, 202, 202);
        min-height: 30px;
    }
    .dragElements__item {
        display: flex;
        align-items: center;
    }
    .dragElements__item {
      width: 100%;
    }
    ::-webkit-scrollbar-track{
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    
    ::-webkit-scrollbar{
      width: 8px;
      height: 8px;
      background-color: #F5F5F5;
      border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb{
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #555;
    }
    
                  </style>`;
    saveAs(
      'data:text/html;charset=utf-8, ' +
        encodeURIComponent(style + html.outerHTML),
      filename
    );
  }
}
