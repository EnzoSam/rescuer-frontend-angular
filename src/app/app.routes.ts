import {  Routes } from '@angular/router';
import { ErrorDefaultComponent } from './shared/components/error-default/error-default.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { UsefulldataPageComponent } from './pages/usefulldata-page/usefulldata-page.component';
import { authGuard } from './auth.guard';
import { ROLES } from './auth/constants/role.constant';

export const routes: Routes = [

    { path: '', redirectTo:'home', pathMatch:'full', },
    { path: 'home',loadChildren: () => import('./home/home.route').then(m => m.HomeRoutes) },
    { path: 'auth', loadChildren: () => import('./auth/aut.routes').then(m => m.AuthRoutes) },
    { path: 'dashboard', canActivate: [authGuard],
     data:{expectedRole:ROLES.ADMIN},
    loadChildren: () => import('./admin/admin.routes').then(m => m.AdminRoutes) },
    {path:'useful-data', component:UsefulldataPageComponent},
    {path:'contact', component:ContactPageComponent},
    { path: 'publications', loadChildren: () => import('./rescuers/rescuers.route').then(m => m.RescuersRoutes) },
    {
        path:'**', component:ErrorDefaultComponent
    }
];
