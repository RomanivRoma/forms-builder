import { Alignment } from "../enums/alignment.model";
import { Indent } from "./indent.interface";

export interface ElementStyle {
    fontSize: number,
    color: string,
    fontWeight: number,
    width: number,
    height: number,
    align: Alignment,
    background: string,
    borderRadius: number,
    borderColor: string,
    padding: Indent,
    margin: Indent
}
