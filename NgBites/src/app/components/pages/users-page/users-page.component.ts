import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { TitleComponent } from '../../shared/title/title.component';
import { SearchComponent } from '../../shared/search/search.component';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.css',
  standalone: true,
  imports: [CommonModule,TitleComponent, SearchComponent, NgIf, NgFor, RouterLink],
})
export class UsersPageComponent {
  users$!: Observable<User[]>; // Observable for the list of users

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    // Use switchMap to fetch users based on the search term in the route params
    this.users$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.userService.getAll(params['searchTerm']))
    );
  }

  // Method to handle the block/unblock toggle for a user
  handleToggleBlock(userId: string) {
    this.userService.toggleBlock(userId).subscribe({
      next: (isBlocked) => {
        // Update block status in the list of users (local update)
        this.users$ = this.users$.pipe(
          switchMap((users) => {
            const updatedUsers = users.map((user) =>
              user.id === userId ? { ...user, isBlocked } : user
            );
            return [updatedUsers];
          })
        );
      },
      error: (err) => {
        // Display an error message using ToastrService if there's an error
        this.toastrService.error(err.error);
        console.log(err.error);
      },
    });
  }
}
