import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, SkeletonComponent]
})
export class AppComponent {
  title = 'rescuer-frontend-angular';
}
