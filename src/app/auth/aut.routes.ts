import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailInfoComponent } from './components/verify-email-info/verify-email-info.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';


export const AuthRoutes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:out', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyEmailInfoComponent },
  { path: 'validate/:email/:token', component: ValidateEmailComponent }
];

