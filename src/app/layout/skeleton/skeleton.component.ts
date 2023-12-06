import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from "../../home/components/slider/slider.component";
import { NavigationComponent } from '../navigation/navigation.component';
import { StatusPopupComponent } from "../../shared/components/status-popup/status-popup.component";

@Component({
    selector: 'app-skeleton',
    standalone: true,
    templateUrl: './skeleton.component.html',
    styleUrl: './skeleton.component.css',
    imports: [CommonModule, RouterOutlet, NavigationComponent, StatusPopupComponent]
})
export class SkeletonComponent {

}
