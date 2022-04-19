import { createReducer, on } from "@ngrx/store";
import { Element } from "../models/element.model";
import { elementStyleValueChange } from '../actions/element.actions';

// const initialState: Element = {
//     placeholder: 'Placeholder',
//     fontSize: 25,
//     fontColor: '#000',
//     width: 300,
//     height: 300,
//     required: false
// }

export const elementReducer = createReducer(
    {},
    on(elementStyleValueChange, (state, { type, ...update }) => { 
        return ({ ...state, ...update })
    }),
  );