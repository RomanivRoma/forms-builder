import { Alignment } from "../enums/alignment.model";

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
    paddingTop: number,
    paddingRight: number,
    paddingBottom: number,
    paddingLeft: number,
    marginTop: number,
    marginRight: number,
    marginBottom: number,
    marginLeft: number,
}
