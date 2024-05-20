import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPost } from '../../interfaces/post.interface';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-find-publication-card',
  standalone: true,
  imports: [CommonModule,RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './find-publication-card.component.html',
  styleUrl: './find-publication-card.component.css'
})
export class FindPublicationCardComponent {

  @Input() publication?:IPost;

  constructor()
  {

  }
}
