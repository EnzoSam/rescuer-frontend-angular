import { Injectable } from "@angular/core";
import { IContact } from "../../admin/interfaces/icontact.interface";

@Injectable({
    providedIn: 'root'
})

export class ContactService  {

    new():IContact
    {
      return {
          contact:'',
          type:''
      }
    }

    getByType(_contacts:IContact[], _type:string):string
    {
        if(!_contacts) return '';

        let cr = _contacts.find(c=>c.type === _type);
        return cr != null? cr.contact:'';
    }
}