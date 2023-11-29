import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from "../slider/slider.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, SliderComponent]
})
export class HomeComponent {

}
