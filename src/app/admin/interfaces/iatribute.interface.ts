import { IIdentificable } from "../../core/interfaces/idetificable.interface"

export interface IAtribute extends IIdentificable
{
    name: string
    group: string
    image:string
}