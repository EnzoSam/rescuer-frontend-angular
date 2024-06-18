import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Site } from '../../../shared/constants/global.constant';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, MatButtonModule,RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent {

  baseAssetUrl=Site.BaseAssetsPath;
}
