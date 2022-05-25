import { Alignment } from "src/app/enums/alignment.model";

export interface Form {
    title: string;
    fontSize: number;
    fontColor: string;
    width: number;
    height: number;
    align: Alignment;
    background: string;
}