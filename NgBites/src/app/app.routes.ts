import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-details/food-details.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';

export const routes: Routes = [
  // no lazy loading
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', component: HomeComponent },
  { path: 'food/:id', component: FoodPageComponent },

  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: 'cart-page', component: CartPageComponent },

  //admin routes
  { path: 'orders', component: OrdersPageComponent },
  {
    path: 'orders/:filter',
    component: OrdersPageComponent,
  },
];
