import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../../admin/interfaces/icontact.interface';
import { ContactService } from '../../services/contact.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, 
    MatIconModule, MatButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  @Input() contactModel?:IContact;
  @Input() id:any;
  form:FormGroup;
  @Output() onContactCommited:EventEmitter<IContact> = new EventEmitter<IContact>();
  @Output() onContactRemoved:EventEmitter<IContact> = new EventEmitter<IContact>();
  
  constructor(private _contactService:ContactService)
  {
      this.form = new FormGroup({
        contact : new FormControl('', [Validators.required]),
        type : new FormControl('', [Validators.required]),
      });  
  }
  ngOnInit(): void {

    this.form.patchValue({
      contact: this.contactModel?.contact,
      type: this.contactModel?.type
      });
  }

  get contact() { return this.form.get('contact'); }
  get type() { return this.form.get('type'); }

  onSubmit(e:any)
  {
    if(this.contactModel)
      {
        this.contactModel.contact = this.form.value.contact;
        this.contactModel.type = this.form.value.type;
        this.onContactCommited.emit(this.contactModel);
      }
  }

  remove()
  {
    this.onContactRemoved.emit(this.contactModel);
  }
}
