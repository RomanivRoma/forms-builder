import { createReducer, on } from '@ngrx/store';
import { Element } from '../models/element.model';
import { elementStyleValueChange } from '../actions/element.actions';
import { Alignment } from 'src/app/enums/alignment.model';

const initialState: Element = {
  background: '#ffffff',
  borderColor: 'unset',
  borderRadius: 0,
  color: 'unset',
  containerWidth: 100,
  fontSize: 14,
  fontWeight: 400,
  height: 22,
  justifyContent: Alignment.left,
  label: '',
  margin: { top: 5, right: 5, bottom: 5, left: 5 },
  options: [],
  padding: { top: 0, right: 0, bottom: 0, left: 0 },
  placeholder: 'Placeholer',
  required: false,
  value: 'Text',
  width: 100,
};

export const elementReducer = createReducer(
  initialState,
  on(elementStyleValueChange, (state, { type, ...update }) => {
    return { ...state, ...update };
  })
);
