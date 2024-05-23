import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AdminParamPaths, AdminPaths } from './constants/adminPaths.constant';
import { AtributesListComponent } from './components/atributes-list/atributes-list.component';
import { RouterPathParams } from '../shared/constants/routesPaths.constant';
import { AtributesDetailComponent } from './components/atributes-detail/atributes-detail.component';
import { ZonesComponent } from './components/zones/zones.component';
import { ZoneDetailComponent } from './components/zone-detail/zone-detail.component';
import { UsefullDataListComponent } from './components/usefull-data-list/usefull-data-list.component';
import { UsefullDataDetailComponent } from './components/usefull-data-detail/usefull-data-detail.component';

export const AdminRoutes: Routes = [
  {
    path:'', component: DashboardAdminComponent,
    children: [
      { path: AdminPaths.atributes, component: AtributesListComponent },
      { path: AdminPaths.atributeDetail, pathMatch:'full', component: AtributesDetailComponent },
      { path: AdminPaths.atributeDetail + '/:' + RouterPathParams.id, component: AtributesDetailComponent },      
      { path: AdminPaths.zone, pathMatch:'full', component: ZonesComponent },
      { path: AdminPaths.zone+ '/:' + AdminParamPaths.parentId, component: ZonesComponent },
      { path: AdminPaths.zoneDetail, pathMatch:'full', component: ZoneDetailComponent },
      { path: AdminPaths.zoneChildDetail + "/:parentId", component: ZoneDetailComponent },
      { path: AdminPaths.zoneDetail+ '/:' + RouterPathParams.id, component: ZoneDetailComponent },
      { path: AdminPaths.usefulData, pathMatch:'full', component: UsefullDataListComponent },
      { path: AdminPaths.usefulDataDetail+ '/:' + RouterPathParams.id, component: UsefullDataDetailComponent },
    ]
  }
];

