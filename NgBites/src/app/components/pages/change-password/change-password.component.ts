import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from '../../shared/title/title.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { DefaultButtonComponent } from '../../shared/default-button/default-button.component';
import { PasswordsMatchValidator } from '../../../validators/password_match_validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent]
})
export class ChangePasswordComponent {

changePasswordForm = new FormGroup({
  currentPassword: new FormControl("", [Validators.required]),
  newPassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  confirmPassword: new FormControl('', [Validators.required])
}, {
  validators: [PasswordsMatchValidator('newPassword', 'confirmPassword')]
})

isSubmitted: boolean = false;

constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }


changePassword() {
  this.isSubmitted = true;
  if (this.changePasswordForm.invalid) {
    return;
  }
  const currentPassword = this.changePasswordForm.value.currentPassword as string;
  const newPassword = this.changePasswordForm.value.newPassword as string;

  this.userService.changePassword(currentPassword, newPassword).subscribe({
    next: () => {
      this.changePasswordForm.reset();
      this.isSubmitted = false;
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
