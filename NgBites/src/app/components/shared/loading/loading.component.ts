import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  standalone: true,
  imports: [NgIf],
})
export class LoadingComponent {
  isLoading!: boolean;

  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
