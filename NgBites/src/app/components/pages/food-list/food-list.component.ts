import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Food } from '../../../models/Food';

@Component({
  selector: 'app-food-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent {
  @Input() foods: Food[] = []; 
}