import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-details/food-details.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { OrdersPageComponent } from './components/pages/orders-page/orders-page.component';
import { UsersPageComponent } from './components/pages/users-page/users-page.component';
import { adminGuard } from './auth/guards/admin.guard';
import { UserEditPageComponent } from './components/pages/user-edit-page/user-edit-page.component';
import { FoodsAdminPageComponent } from './components/pages/foods-admin-page/foods-admin-page.component';
import { FoodEditPageComponent } from './components/pages/food-edit-page/food-edit-page.component';
import { authGuard } from './guards/auth.guard';
import {ConfirmCartComponent} from "./components/pages/confirm-cart/confirm-cart.component"
export const routes: Routes = [
  // no lazy loading
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: '', 
    component: HomeComponent,
    canActivate: [authGuard],

   },
  { path: 'food/:id', 
    component: FoodPageComponent,
    canActivate: [authGuard],
 },
  { path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [authGuard], 
},
  { path: 'profile', 
    component: ProfilePageComponent,
    canActivate: [authGuard], 
},
  { path: 'cart-page', 
    component: CartPageComponent,
    canActivate: [authGuard], 
},

  //admin routes
  { path: 'orders', 
    component: OrdersPageComponent,
    canActivate: [authGuard], 
}, 
  {
    path: 'orders/:filter',
    component: OrdersPageComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin/users',
    component: UsersPageComponent,
    canActivate: [adminGuard,authGuard],
  },
  {
    path: 'admin/editUser/:userId',
    component: UserEditPageComponent,
    canActivate: [adminGuard,authGuard],
  },
  {
    path: 'admin/users/:searchTerm',
    component: UsersPageComponent,
    canActivate: [adminGuard,authGuard],
  },

  {
    path: 'admin/foods',
    component: FoodsAdminPageComponent,
    canActivate: [adminGuard,authGuard],
  },
  {
    path: 'admin/foods/:searchTerm',
    component: FoodsAdminPageComponent,
    canActivate: [adminGuard,authGuard],
  },
  {
    path: 'admin/addFood',
    component: FoodEditPageComponent,
    canActivate: [adminGuard,authGuard],
  },
  {
    path: 'admin/editFood/:id',
    component: FoodEditPageComponent,
    canActivate: [ adminGuard, authGuard],
  },
  { 
    path : 'confirm-cart',
    component : ConfirmCartComponent ,
    canActivate: [authGuard],

  },
  {
    path :'tag/:tag',
    component : HomeComponent
  }
];
