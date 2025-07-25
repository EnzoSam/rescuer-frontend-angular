import { IContact } from "../../admin/interfaces/icontact.interface"

export interface IUser
{
    id:any
    name: string
    lastName: string
    email: string
    image:string
    contacts:IContact[]
    zoneId:any
}