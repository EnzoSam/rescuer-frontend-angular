import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../../admin/interfaces/icontact.interface';
import { ContactsType } from '../../constants/contact.constant';

@Component({
  selector: 'app-contact-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-link.component.html',
  styleUrl: './contact-link.component.css'
})
export class ContactLinkComponent {

  @Input() contact?:IContact
  @Input() textToSend:string = '';
  contactsType=ContactsType;

}
