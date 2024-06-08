import { Routes } from "@angular/router";
import { FindAnimalComponent } from "./components/find-animal/find-animal.component";
import { PublicationDetailComponent } from "./components/publication-detail/publication-detail.component";
import { CreateAnimalComponent } from "./components/create-animal/create-animal.component";
import { RescuersPaths } from "./constants/rescuersPaths.constant";
import { RouterPathParams } from "../shared/constants/routesPaths.constant";
import { authGuard } from "../auth.guard";
import { CreateLostAnimalComponent } from "./components/create-lost-animal/create-lost-animal.component";

export const RescuersRoutes: Routes = [
    {
      path:'', redirectTo:'find', pathMatch:'full'
    },
    { path: 'find', component: FindAnimalComponent },
    { path: 'lost', data:{lost:true}, component: FindAnimalComponent },
    { path: RescuersPaths.postAnimalDetail + '/:' + RouterPathParams.id, component: PublicationDetailComponent },
    { path: RescuersPaths.create, pathMatch:'full', component: CreateAnimalComponent, canActivate: [authGuard] },
    { path: RescuersPaths.createLost, component: CreateLostAnimalComponent, canActivate: [authGuard] },
    
  ];
  
  