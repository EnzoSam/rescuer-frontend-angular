import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserMenuComponent } from "../../shared/components/user-menu/user-menu.component";
import { MatMenuModule } from '@angular/material/menu';


@Component({
    selector: 'app-navigation',
    standalone: true,
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.css',
    imports: [CommonModule, RouterLink, MatToolbarModule, 
        MatButtonModule, UserMenuComponent,MatIconModule,MatMenuModule]
})
export class NavigationComponent {
    isMenuOpen = false; // Add this property to control menu visibility

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
}
