import { Alignment } from "../enums/alignment.model";
import { Indent } from "./indent.interface";

export interface ElementStyle {
    fontSize: string,
    color: string,
    fontWeight: number,
    width: string,
    height: string,
    align: Alignment,
    background: string,
    borderRadius: string,
    borderColor: string,
    paddingTop: string,
    paddingRight: string,
    paddingBottom: string,
    paddingLeft: string,
    // padding: Indent,
    // margin: Indent
    marginTop: string,
    marginRight: string,
    marginBottom: string,
    marginLeft: string,
}
