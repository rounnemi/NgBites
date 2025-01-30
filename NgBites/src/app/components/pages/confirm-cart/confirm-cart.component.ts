import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';
import { Order } from '../../../models/Order';
import { MapComponent } from '../../shared/map/map.component';
import { OrderItemsListComponent } from '../../shared/order-items-list/order-items-list.component';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { TitleComponent } from '../../shared/title/title.component';

@Component({
  selector: 'app-confirm-cart',
  templateUrl: './confirm-cart.component.html',
  styleUrls: ['./confirm-cart.component.css'],
  standalone: true,
  imports: [TitleComponent, ReactiveFormsModule, TextInputComponent, OrderItemsListComponent, MapComponent]
})
export class ConfirmCartComponent {

  order: Order = new Order();
  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) { 
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;

    const { name, address } = this.userService.currentUser || { name: '', address: '' };
    this.checkoutForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      address: new FormControl(address, [Validators.required])
    });
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning('Please select your address from the map', 'Invalid Address');
      return;
    }

    this.order.name = this.checkoutForm.value.name;
    this.order.address = this.checkoutForm.value.address;

    this.orderService.create(this.order).subscribe({
      next: () => this.processPayment(),
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Order Creation Failed');
      }
    });
  }

  private processPayment() {
    this.orderService.pay(this.order).subscribe({
      next: () => {
        this.toastrService.success("You can track your order in the orders section", "Your order has been validated");
        this.cartService.clearCart()
        this.router.navigateByUrl('/')
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Order Creation Failed');
      }
    });
  }
}
