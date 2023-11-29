import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-publication-create',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatIconModule],
  templateUrl: './publication-create.component.html',
  styleUrl: './publication-create.component.css'
})
export class PublicationCreateComponent {

}
