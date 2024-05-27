import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from "../slider/slider.component";
import { AboutComponent } from '../about/about.component';
import { ColaboratorsComponent } from '../colaborators/colaborators.component';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, MatDividerModule,
         SliderComponent,AboutComponent,
         ColaboratorsComponent, FooterComponent]
})
export class HomeComponent {

}
