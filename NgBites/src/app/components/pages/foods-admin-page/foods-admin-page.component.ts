import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { TitleComponent } from '../../shared/title/title.component';
import { SearchComponent } from '../../shared/search/search.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { Food } from '../../../models/Food';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-foods-admin-page',
  templateUrl: './foods-admin-page.component.html',
  styleUrl: './foods-admin-page.component.css',
  standalone: true,
  imports: [
    TitleComponent,
    SearchComponent,
    RouterLink,
    NgIf,
    NotFoundComponent,
    NgFor,
    CurrencyPipe,
  ],
})
export class FoodsAdminPageComponent {
  foods: Food[] = [];

  searchTerm = '';

  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private toastrService: ToastrService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
        this.foodService
          .getAllFoodsBySearchTerm(params['searchTerm'])
          .subscribe((serverFoods) => {
            this.foods = serverFoods;
          });
      } else {
        this.foodService.getAll().subscribe((serverFoods) => {
          this.foods = serverFoods;
        });
      }
    });
  }

  deleteFood(food: Food) {
    const confirmed = window.confirm(`Delete Food ${food.name}?`);
    if (!confirmed) return;

    this.foodService.deleteById(food.id).subscribe({
      next: () => {
        this.toastrService.success(`${food.name} Has Been Deleted!`);
        this.foods = this.foods.filter((f) => f.id !== food.id);
      },
      error: (err) => {
        console.error('Error deleting food:', err);
      },
    });
  }
}
