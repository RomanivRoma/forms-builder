import { createReducer, on } from '@ngrx/store';
import { Form } from '../models/form.model';
import { formStyleValueChange } from '../actions/form.actions';
import { Alignment } from 'src/app/enums/alignment.model';

const initialState: Form = {
  title: 'Form Title',
  fontSize: 25,
  fontColor: '#000000',
  width: 500,
  height: 300,
  align: Alignment.left,
  background: '#13c00d',
};

export const formReducer = createReducer(
  initialState,
  on(formStyleValueChange, (state, { type, ...update }) => {
    return { ...state, ...update };
  })
);
