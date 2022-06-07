import { Injectable } from '@angular/core'
import { createAction, props } from '@ngrx/store'
import { Element } from '../models/element.model'

export const elementStyleValueChange = createAction('[Element] SetValues',
                                                    props<Element>());