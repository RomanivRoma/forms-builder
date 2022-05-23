import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DragElement } from '../../interfaces/drag-element.interface';
import { DragDropService } from '../services/drag-drop.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragComponent implements OnInit {
  defaultStyle: any = {
    "fontSize.px": '14',
    "color": '#212529',
    "fontWeight": '400',
    "width.%": '100',
    "height.px": '22',
    "align": 'left',
    "background": '#ffffff',
    "borderRadius.px": '0',
    "borderColor": '0',
    "paddingTop.px": '0',
    "paddingRight.px": '0',
    "paddingBottom.px": '0',
    "paddingLeft.px": '0',
    "marginTop.px": '5',
    "marginRight.px": '5',
    "marginBottom.px": '5',
    "marginLeft.px": '5'
  }
  defaultParentStyle: any = {
    'width': '100',
    'justifyContent': 'left'
  }
  componentList: DragElement[] = [
    {
      title: 'Text',
      icon: `${environment.images}/pencil.svg`,
      tag: 'p',
      type: 'text',
      class: 'custom-text',
      value: 'Text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Text Input',
      icon: `${environment.images}/toy-alphabet-blocks.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Textarea',
      icon: `${environment.images}/writing.svg`,
      tag: 'textarea',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Checkbox',
      icon: `${environment.images}/checkbox.svg`,
      tag: 'input',
      type: 'checkbox',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Date',
      icon: `${environment.images}/date.svg`,
      tag: 'input',
      type: 'date',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Email',
      icon: `${environment.images}/email-round-solid.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'email',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Password',
      icon: `${environment.images}/password.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'password',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Number',
      icon: `${environment.images}/board-score.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'number',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Link',
      icon: `${environment.images}/domain-name.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'url',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Radio Button',
      icon: `${environment.images}/list-view.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'radio',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Multi Select',
      icon: `${environment.images}/select-all.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle,
      options: ['Option']
    },
    {
      title: 'Select',
      icon: `${environment.images}/check-mark-box-line.svg`,
      tag: 'select',
      placeholder: 'Placeholer',
      type: 'text',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle,
      options: ['Option']
    },
    {
      title: 'File Uploader',
      icon: `${environment.images}/file-upload.svg`,
      tag: 'input',
      placeholder: 'Placeholer',
      type: 'file',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
    {
      title: 'Button',
      icon: `${environment.images}/submit-label.svg`,
      tag: 'button',
      placeholder: 'Placeholer',
      value: 'Submit',
      type: 'submit',
      style: this.defaultStyle,
      parentStyle: this.defaultParentStyle
    },
  ];
  constructor(private dragDrop: DragDropService) { }

  ngOnInit(): void {
  }
  noReturnPredicate() {
    return false;
  }
  handleAdd(item: DragElement): DragElement{
    return this.dragDrop.addElement(item)
  }
}
