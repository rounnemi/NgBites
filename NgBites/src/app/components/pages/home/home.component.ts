import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/Food';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../../shared/tags/tags.component';
import { SearchComponent } from '../../shared/search/search.component';
import { FoodListComponent } from '../food-list/food-list.component';
@Component({
  selector: 'app-home',
  imports: [FoodListComponent,SearchComponent,CommonModule, TagsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {
  foods: Food[] = [];
  todayMenu: Food[] = [];
  mostOrdered: Food[] = [];
  visibleFoods: Food[] = [];
  itemsPerPage = 10; 

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      console.log(params)
      if (params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      } else if (params['tag']) {
        console.log("hgjerkfb")
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag']);
      } else {
        foodsObservable = this.foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
        this.todayMenu = serverFoods.slice(0, 3);
        this.mostOrdered = serverFoods.sort((a, b) => b.stars - a.stars).slice(0, 5);
        this.visibleFoods = this.foods.slice(0, this.itemsPerPage);
      });
    });
  }

  loadMore() {
    const nextItems = this.foods.slice(this.visibleFoods.length, this.visibleFoods.length + this.itemsPerPage);
    this.visibleFoods = [...this.visibleFoods, ...nextItems];
  }
}
