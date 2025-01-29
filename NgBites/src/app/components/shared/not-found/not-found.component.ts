import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  standalone: true,
  imports: [NgIf, RouterLink],
})
export class NotFoundComponent {
  @Input()
  visible = false; // Or can use *ngIf

  @Input()
  notFoundMessage = 'Nothing Found!';

  @Input()
  resetLinkText = 'Reset';

  @Input()
  resetLinkRoute = '/';
}
