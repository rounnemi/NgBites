import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [RouterLink]
})
export class DashboardComponent {

allItems = [
  {
    title: 'Orders',
    imageUrl: 'assets/orders.svg',
    url: '/orders',
    color: 'white',
  },
  {
    title: 'Profile',
    imageUrl: 'assets/profile.svg',
    url: '/profile',
    color: 'white',
  },
  {
    title: 'Users',
    imageUrl: 'assets/users.svg',
    url: '/admin/users',
    forAdmin: true,
    color: 'white',
  },
  {
    title: 'Foods',
    imageUrl: 'assets/foods.svg',
    url: '/admin/foods',
    forAdmin: true,
    color: 'white',
  },
];

isAdmin!: boolean;

constructor(userService: UserService) {

  this.isAdmin = userService.currentUser.isAdmin

}

}
