import { Component, Input, OnChanges, SimpleChanges, Signal, signal } from '@angular/core';
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
export class FoodListComponent implements OnChanges {
  @Input() foods: Food[] = [];
  @Input() itemsPerPage = 10;

  allFoods = signal<Food[]>([]);
  visibleFoods = signal<Food[]>([]);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['foods'] && this.foods) {
      console.log("SALURTTT",this.foods);
      this.allFoods.set(this.foods);
      this.visibleFoods.set(this.foods.slice(0, this.itemsPerPage));
    }
  }

  loadMore() {
    const nextItems = this.allFoods().slice(this.visibleFoods().length, this.visibleFoods().length + this.itemsPerPage);
    this.visibleFoods.set([...this.visibleFoods(), ...nextItems]);
  }
}
