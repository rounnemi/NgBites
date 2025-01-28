import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultButtonComponent } from '../../shared/default-button/default-button.component';
import { TitleComponent } from '../../shared/title/title.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    DefaultButtonComponent,
    RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  isSubmitted = false;  
  returnUrl = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // query parameters. 
  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  submit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    // alert(`email: ${this.loginForm.value.email} , password: ${this.loginForm.value.password}`);

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.userService
      .login({
        email: email,
        password: password,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl); 
      });
  }

}
