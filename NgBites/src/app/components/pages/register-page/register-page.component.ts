import { Component, OnInit } from '@angular/core';
import { IUserRegister } from '../../../models/dtos/IuserRegister';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../shared/title/title.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { DefaultButtonComponent } from '../../shared/default-button/default-button.component';
import { PasswordsMatchValidator } from '../../../validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent, RouterLink]
})
export class RegisterPageComponent implements OnInit {

isSubmitted: boolean = false;
returnUrl = '';

registerForm = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(5)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  confirmPassword: new FormControl('', [Validators.required]),
  address: new FormControl('', [Validators.required, Validators.minLength(5)])
}, {
  validators: [PasswordsMatchValidator('password', 'confirmPassword')]
})

constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

ngOnInit(): void {
  this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
}

submit() {
  this.isSubmitted = true;
  if (this.registerForm.invalid) return;

  const fv = this.registerForm.value;
  const user: IUserRegister = {
    name: fv.name!,
    email: fv.email!,
    password: fv.password!,
    confirmPassword: fv.confirmPassword!,
    address: fv.address!,
  };

  this.userService.register(user).subscribe(() => {
    this.router.navigateByUrl(this.returnUrl);
  })
}

}

