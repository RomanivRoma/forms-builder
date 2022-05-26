import { Alignment } from "src/app/enums/alignment.model";
import { Indent } from "src/app/interfaces/indent.interface";

export class Element {
    placeholder?: string;
    fontSize?: number;
    color?: string;
    fontWeight?: number;
    width?: number;
    height?: number;
    required?: boolean;
    label?: string;
    justifyContent?: Alignment;
    containerWidth?: number;
    value?: string;
    background?: string;
    borderRadius?: number;
    borderColor?: string;
    padding?: Indent;
    margin?: Indent;
    options?: string[];
    align?: Alignment;
}
    