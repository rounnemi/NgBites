import { Component, computed, effect, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/Food';
import { CommonModule } from '@angular/common';
import { TagsComponent } from '../../shared/tags/tags.component';
import { SearchComponent } from '../../shared/search/search.component';
import { FoodListComponent } from '../food-list/food-list.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [FoodListComponent, SearchComponent, CommonModule, TagsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true
})
export class HomeComponent {
  foods = signal<Food[]>([]);
  itemsPerPage = 5;
  page = signal(1);

  todayMenu = computed(() => this.foods().slice(0, 3));
  mostOrdered = computed(() => [...this.foods()].sort((a, b) => b.stars - a.stars).slice(0, 5));
  visibleFoods = computed(() => this.foods().slice(0, this.page() * this.itemsPerPage));
  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap((params) => {
          if (params['searchTerm']) {
            return this.foodService.getAllFoodsBySearchTerm(params['searchTerm']);
          } else if (params['tag']) {
            return this.foodService.getAllFoodsByTag(params['tag']);
          } else {
            return this.foodService.getAll();
          }
        })
      )
      .subscribe((serverFoods) => {
        this.foods.set(serverFoods);
        this.page.set(1);
      });
  }

  loadMore() {
    this.page.set(this.page() + 1);
  }
}
