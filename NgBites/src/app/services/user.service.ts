import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GET_ALL_USERS, UPDATE_USER_URL, USER_BLOCK_URL, USER_BY_ID_URL, USER_CHANGE_PASSWORD_URL, USER_LOGIN_URL, USER_REGISTER_URL, USER_UPDATE_PROFILE_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/User';
import { IUserLogin } from '../models/dtos/IUserLogin';
import { IUserRegister } from '../models/dtos/IuserRegister';
import { IUserUpdateProfile } from '../models/dtos/IUserUpdateProfile';


const USER_KEY = 'User'; //for local storage

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  // Getter for the current user
  public get currentUser(): User {
    return this.userSubject.value;
  }

  // login
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          // Save the logged in user to local storage and trigger a notification about it
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine !`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login Failed')
        }
      })
    )

  }

  // register
  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          // Update user state and display success message
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register Failed')
        }
      })
    )
  }

  // logout
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }


  updateProfile(userUpdateProfile: IUserUpdateProfile): Observable<User> {
    return this.http.put<User>(USER_UPDATE_PROFILE_URL, userUpdateProfile).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Profile Updated Successfully`,
            'Profile Updated'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Profile Update Failed')
        }
      })
    )
  }

  changePassword(currentPassword: string, newPassword: string) {
    // Construct the request body
    const requestBody = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    return this.http.put(USER_CHANGE_PASSWORD_URL, requestBody).pipe(
      tap({
        next: () => {
          this.toastrService.success(
            `Password Changed Successfully`,
            'Password Changed'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Password Change Failed')
        }
      })
    );
  }


  getAll(searchTerm: string): Observable<User[]> {
    return this.http.get<User[]>(GET_ALL_USERS + (searchTerm ?? ''));
  }


  getById(userId: string): Observable<User> {
    return this.http.get<User>(USER_BY_ID_URL + userId);
  }

  updateUser(userid: string, userData: any) {
    return this.http.put(UPDATE_USER_URL + userid, userData);
  }


  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return new User();
  }

}
