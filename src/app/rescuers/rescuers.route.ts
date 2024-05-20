import { Routes } from "@angular/router";
import { FindAnimalComponent } from "./components/find-animal/find-animal.component";
import { PublicationDetailComponent } from "./components/publication-detail/publication-detail.component";
import { CreateAnimalComponent } from "./components/create-animal/create-animal.component";
import { RescuersPaths } from "./constants/rescuersPaths.constant";

export const RescuersRoutes: Routes = [
    {
      path:'', redirectTo:'find', pathMatch:'full'
    },
    { path: 'find', component: FindAnimalComponent },
    { path: 'detail', component: PublicationDetailComponent },
    { path: RescuersPaths.create, component: CreateAnimalComponent },
    
  ];
  
  