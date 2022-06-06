import { Injectable, ElementRef, ViewChild } from '@angular/core';
import { DragElement } from 'src/app/interfaces/drag-element.interface';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { saveAs } from 'file-saver';
import { DropComponent } from '../dropSection/drop.component';
import { ComponentTag } from 'src/app/enums/component-tag.model';
import { InputType } from 'src/app/enums/input-type.model';
import { VisibleControls } from 'src/app/interfaces/visible-controls.interface';
import { cDownloadStyles } from 'src/app/constants/download-form-style.const';
import { cComponentTags } from 'src/app/constants/component-tag.const';

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

  public formControlVisibleChange: BehaviorSubject<VisibleControls> =
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
      (el) => el.id === this.selectedElementId.getValue()
    )!;
    selectedElement = { ...selectedElement, ...element };
    const newComponentList: DragElement[] = componentList.map((component) =>
      component.id === selectedElement?.id ? selectedElement : component
    );
    this.addedComponentList.next(newComponentList);
  }
  public setFormControlVisibleChange(component: DragElement): VisibleControls {
    const cType: InputType = component.type!;
    const cTag: ComponentTag = component.tag!;
    const isDefault: boolean = !(component.tag! in cComponentTags || component.type! in cComponentTags);
    
    if(isDefault){
      console.log('default');
      return cComponentTags['default'];
    }
    else if(cType === InputType.radio || cType == InputType.checkbox){
      console.log('radio');
      
      return cComponentTags[InputType.radio]
    }
    else{
      console.log('else', cComponentTags[cTag]);
      
      return cComponentTags[cTag];
    }
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
    const style: string = cDownloadStyles;
    saveAs(
      'data:text/html;charset=utf-8, ' +
        encodeURIComponent(style + html.outerHTML),
      filename
    );
  }
}
