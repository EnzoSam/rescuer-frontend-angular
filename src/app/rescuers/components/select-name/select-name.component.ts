import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-select-name',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, 
    MatIconModule, MatButtonModule],
  templateUrl: './select-name.component.html',
  styleUrl: './select-name.component.css'
})
export class SelectNameComponent {

  form:FormGroup;
  @Output() onNameSelected:EventEmitter<string | undefined> =
   new EventEmitter<string | undefined>();
  constructor()
  {
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required]),
    });   
  }
  
  get name() { return this.form.get('name'); }  

  onSubmit(e:any)
  {
    //e.preventDefault();
    this.onNameSelected.emit(this.form.value.name);
  }
}
