import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailInfoComponent } from './components/verify-email-info/verify-email-info.component';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


export const AuthRoutes: Routes = [
  {
    path:'', redirectTo:'login', pathMatch:'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:out', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'verify', pathMatch:'full', component: VerifyEmailInfoComponent },
  { path: 'verify/:reset', component: VerifyEmailInfoComponent },
  { path: 'validate/:email/:token', component: ValidateEmailComponent },
  { path: 'reset/:email/:token', component: NewPasswordComponent },
  { path: 'profile', component: UserProfileComponent }
];

