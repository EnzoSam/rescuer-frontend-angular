import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Animal } from '../../models/animal.model';
import { AnimalService } from '../../services/animal.service';
import { UiService } from '../../../shared/services/ui.service';

@Component({
  selector: 'app-create-lost-animal',
  standalone: true,
  imports: [CommonModule,RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './create-lost-animal.component.html',
  styleUrl: './create-lost-animal.component.css'
})
export class CreateLostAnimalComponent implements OnInit {

  animal: Animal;

  constructor(private _animalService: AnimalService,
    private _router: Router,
    private _uiService: UiService,
    private _activateRoute: ActivatedRoute) {
    this.animal = this._animalService.new();
    this.animal.lost = true;
  }

  ngOnInit(): void {

  }

  submit(e: any): void {
    e.preventDefault();

  }
}
