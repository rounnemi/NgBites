import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../shared/title/title.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { DefaultButtonComponent } from '../../shared/default-button/default-button.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, DefaultButtonComponent]
})
export class ProfilePageComponent {

profileForm: FormGroup;
isSubmitted: boolean = false;
// returnUrl = ''; // I think its not needed here

constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router, private toastrService: ToastrService) { 
  let { name, address } = userService.currentUser;
  this.profileForm = new FormGroup({
    name: new FormControl(name, [Validators.required]),
    address: new FormControl(address, [Validators.required])
  })
}


updateProfile() {
  this.isSubmitted = true;
  if (this.profileForm.invalid) {
    this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
    return;
  }

  const name = this.profileForm.value.name as string;
  const address = this.profileForm.value.address as string;

  this.userService.updateProfile({
    name,
    address
  }).subscribe((newUser) => {
    // console.log(newUser);
    // this.router.navigateByUrl(this.returnUrl);
  })
}

}
