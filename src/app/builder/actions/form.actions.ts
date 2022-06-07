import { createAction, props } from '@ngrx/store'
import { Form } from '../models/form.model'

export const formStyleValueChange  = createAction('[Form] SetValues',
                                                    props<Form>());