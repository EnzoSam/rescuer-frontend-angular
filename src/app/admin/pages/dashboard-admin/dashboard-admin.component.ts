import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminPaths } from '../../constants/adminPaths.constant';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule,MatSidenavModule, MatButtonModule,
    MatIconModule,MatMenuModule,RouterLink,RouterOutlet],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.css'
})
export class DashboardAdminComponent {

  paths = AdminPaths;
}
