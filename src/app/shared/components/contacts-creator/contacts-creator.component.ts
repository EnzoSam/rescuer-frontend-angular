import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../../admin/interfaces/icontact.interface';
import { MatCardModule } from '@angular/material/card';
import { ContactComponent } from '../contact/contact.component';
import { ContactService } from '../../services/contact.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-contacts-creator',
  standalone: true,
  imports: [CommonModule,MatCardModule,ContactComponent,
    MatIconModule, MatButtonModule],
  templateUrl: './contacts-creator.component.html',
  styleUrl: './contacts-creator.component.css'
})
export class ContactsCreatorComponent implements OnInit{

  @Input() contacts?:IContact[]
  @Output() onContactsChanged:EventEmitter<IContact[]> = new EventEmitter<IContact[]>();

  constructor(private _contactService:ContactService)
  {
  }
  ngOnInit(): void {
    
    if(this.contacts && this.contacts.length == 0)      
        this.contacts.push(this._contactService.new());
  }

  onContactCommited(_contact:IContact)
  {
    console.log(this.contacts)
  }

  add()
  {
    this.contacts?.push(this._contactService.new());
    this.onContactsChanged.emit(this.contacts);
  }

  onContactRemove(contact:IContact)
  {
    this.contacts = this.contacts?.filter(c=>c!== contact);
    if(this.contacts?.length == 0)
        this.contacts.push(this._contactService.new());
    this.onContactsChanged.emit(this.contacts);
  }
}
