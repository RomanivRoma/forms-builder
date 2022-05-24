import { ComponentTag } from '../enums/component-tag.model';
import { InputType } from '../enums/input-type.model';

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
  style?: any;
  parentStyle?: any;
  label?: string;
  options?: string[];
}
