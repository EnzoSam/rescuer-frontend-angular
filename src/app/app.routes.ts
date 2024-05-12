import {  Routes } from '@angular/router';
import { ErrorDefaultComponent } from './shared/components/error-default/error-default.component';

export const routes: Routes = [

    { path: '', redirectTo:'home', pathMatch:'full', },
    { path: 'home',loadChildren: () => import('./home/home.route').then(m => m.HomeRoutes) },
    { path: 'auth', loadChildren: () => import('./auth/aut.routes').then(m => m.AuthRoutes) },
    { path: 'dashboard', loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes) },
    { path: 'publications', loadChildren: () => import('./rescuers/rescuers.route').then(m => m.RescuersRoutes) },
    {
        path:'**', component:ErrorDefaultComponent
    }
];
