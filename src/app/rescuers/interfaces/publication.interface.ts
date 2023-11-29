import { IIdentificable } from "../../core/interfaces/idetificable.interface";

export interface IPublication extends IIdentificable
{
    title:string;
    description:string;
    image:string;
}