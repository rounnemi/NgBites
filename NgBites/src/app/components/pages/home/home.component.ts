import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/Food';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../../shared/tags/tags.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TagsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {

  foods:Food[] = [];

  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if(params['searchTerm']) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
      } else if(params['tag']) {
        foodsObservable = this.foodService.getAllFoodsByTag(params['tag'])
      } else {
        foodsObservable = foodService.getAll();
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
      })
      
    })
  }

}
