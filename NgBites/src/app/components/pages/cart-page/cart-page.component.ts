import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../models/Cart';
import { CartItem } from '../../../models/CartItem';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-cart-page',
    templateUrl: './cart-page.component.html',
    styleUrls: ['./cart-page.component.css'],
    standalone: true,
    imports: [ RouterLink, ReactiveFormsModule, CurrencyPipe]
})
export class CartPageComponent {

  cart!: Cart;

  constructor(private cartService: CartService)
  {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    })
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    if(quantity > 0) {
      this.cartService.changeQuantity(cartItem.food.id, quantity);
    }
  }

}
