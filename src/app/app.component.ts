import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { UiService } from './shared/services/ui.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, SkeletonComponent]
})
export class AppComponent implements OnInit{
  title = 'rescuer-frontend-angular';

  constructor(private _uiService:UiService)
  {
    
  }
  ngOnInit(): void {
    this._uiService.loadAuthentication();
  }
}
