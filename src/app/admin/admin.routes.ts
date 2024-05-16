import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AdminPaths } from './constants/adminPaths.constant';
import { AtributesListComponent } from './components/atributes-list/atributes-list.component';
import { RouterPathParams } from '../shared/constants/routesPaths.constant';
import { AtributesDetailComponent } from './components/atributes-detail/atributes-detail.component';
import { ZonesComponent } from './components/zones/zones.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';

export const AdminRoutes: Routes = [
  {
    path:'', component: DashboardAdminComponent,
    children: [
      { path: AdminPaths.atributes, component: AtributesListComponent },
      { path: AdminPaths.atributeDetail + '/:' + RouterPathParams.id, component: AtributesDetailComponent },
      { path: AdminPaths.atributeDetail, component: AtributesDetailComponent },
      { path: AdminPaths.zone, component: ZonesComponent },
      { path: AdminPaths.zoneDetail, component: ZoneDetailComponent }
    ]
  }
];

