import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../../admin/interfaces/icontact.interface';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contacts-creator',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './contacts-creator.component.html',
  styleUrl: './contacts-creator.component.css'
})
export class ContactsCreatorComponent {

  contacts:IContact[]

  constructor()
  {
    this.contacts = [];
  }
}
