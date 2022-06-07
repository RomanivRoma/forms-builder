import { ComponentTag } from '../enums/component-tag.model';
import { InputType } from '../enums/input-type.model';
import { ElementStyle } from './element-style.interface';
import { ParentElementStyle } from './parent-element-style.interface';

export interface DragElement {
  id?: number;
  title?: string;
  icon?: string;
  tag?: ComponentTag;
  type?: InputType;
  value?: string;
  placeholder?: string;
  required?: boolean;
  class?: string;
  style?: ElementStyle;
  parentStyle?: ParentElementStyle;
  label?: string;
  options?: string[];
}
