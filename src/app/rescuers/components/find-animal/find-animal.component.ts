import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFilterPanelComponent } from "../find-filter-panel/find-filter-panel.component";
import { FindAnimalListComponent } from "../find-animal-list/find-animal-list.component";

@Component({
    selector: 'app-find-animal',
    standalone: true,
    templateUrl: './find-animal.component.html',
    styleUrl: './find-animal.component.css',
    imports: [CommonModule, FindFilterPanelComponent, FindAnimalListComponent]
})
export class FindAnimalComponent {

}
