import { Routes } from "@angular/router";
import { FindAnimalComponent } from "./components/find-animal/find-animal.component";
import { PublicationDetailComponent } from "./components/publication-detail/publication-detail.component";
import { PublicationCreateComponent } from "./components/publication-create/publication-create.component";

export const RescuersRoutes: Routes = [
    {
      path:'', redirectTo:'find', pathMatch:'full'
    },
    { path: 'find', component: FindAnimalComponent },
    { path: 'detail', component: PublicationDetailComponent },
    { path: 'create', component: PublicationCreateComponent },
  ];
  
  