import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    // no lazy loading
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    {path :'', component: HomeComponent}

];
