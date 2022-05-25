import { Element } from "./builder/models/element.model";
import { Form } from "./builder/models/form.model";

export interface AppState {
    readonly form: Form;
    readonly element: Element;
}