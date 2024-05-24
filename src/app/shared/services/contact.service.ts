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

}