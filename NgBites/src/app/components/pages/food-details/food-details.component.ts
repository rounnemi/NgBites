import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../models/Food';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-food-details',
    templateUrl: './food-details.component.html',
    styleUrls: ['./food-details.component.css'],
    standalone: true,
    imports: [ RouterLink, CurrencyPipe]
})
export class FoodPageComponent {

  food!: Food;

  constructor(activatedRoute: ActivatedRoute, foodService: FoodService, private cartService: CartService, private router: Router) {
    let foodsObservable: Observable<Food>;
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      {
        foodsObservable = foodService.getFoodById(params['id']);
      }

      foodsObservable.subscribe((serverFood) => {
        this.food = serverFood;
      })

    })
  }

  addToCart() {
    this.cartService.addToCart(this.food); 
    this.router.navigateByUrl('/cart-page');   
  }
}
