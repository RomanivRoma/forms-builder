import { ComponentTag } from '../enums/component-tag.model';
import { InputType } from '../enums/input-type.model';
import { VisibleControls } from '../interfaces/visible-controls.interface';

export const cComponentTags = {
  [ComponentTag.p]: {
    placeholder: false,
    required: false,
    value: true,
    borderRadius: false,
    borderColor: false,
    label: false,
    options: false,
  },
  [ComponentTag.button]: {
    placeholder: false,
    required: false,
    value: true,
    borderRadius: true,
    borderColor: true,
    label: false,
    options: false,
  },
  [ComponentTag.select]: {
    placeholder: true,
    required: true,
    value: false,
    borderRadius: true,
    borderColor: true,
    label: false,
    options: true,
  },
  [ComponentTag.input]: {
    placeholder: true,
    required: true,
    value: false,
    borderRadius: true,
    borderColor: true,
    label: false,
    options: false,
  },
  [ComponentTag.textarea]: {
    placeholder: true,
    required: true,
    value: false,
    borderRadius: true,
    borderColor: true,
    label: false,
    options: false,
  },
  [InputType.radio]: {
    placeholder: false,
    required: true,
    value: false,
    borderRadius: true,
    borderColor: true,
    label: true,
    options: false,
  },
  default: {
    placeholder: true,
    required: true,
    value: false,
    borderRadius: true,
    borderColor: true,
    label: false,
    options: false,
  },
};
