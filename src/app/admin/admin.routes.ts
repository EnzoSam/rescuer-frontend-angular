import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AdminPaths } from './constants/adminPaths.constant';
import { AtributesListComponent } from './components/atributes-list/atributes-list.component';
import { RouterPathParams } from '../shared/constants/routesPaths.constant';
import { AtributesDetailComponent } from './components/atributes-detail/atributes-detail.component';

export const AdminRoutes: Routes = [
  {
    path: '', redirectTo: AdminPaths.dashboard + '/' +AdminPaths.atributes, pathMatch: 'full'
  },
  {
    path: AdminPaths.dashboard, component: DashboardAdminComponent,
    children: [
      { path: AdminPaths.atributes, component: AtributesListComponent },
      { path: AdminPaths.atributeDetail + "/:" + RouterPathParams.id, component: AtributesDetailComponent },
      { path: AdminPaths.atributeDetail, component: AtributesDetailComponent }
    ]
  }
];

