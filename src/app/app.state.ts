import { Element } from "./builder/models/element.model";
import { Form } from "./builder/models/form.model";
import { ComponentStyle } from "./enums/style-enum.model";

export interface AppState {
    readonly [ComponentStyle.form]: Form;
    readonly [ComponentStyle.element]: Element;
}