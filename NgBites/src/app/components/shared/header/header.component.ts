import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User';

import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink]
})
export class HeaderComponent {

  cartQuantity = 0;
  user!: User;

  constructor( private userService: UserService) {


    userService.userObservable.subscribe((newUser) => {
      this.user = newUser;
    })
  }

  logout() {
    this.userService.logout();
  }

}
