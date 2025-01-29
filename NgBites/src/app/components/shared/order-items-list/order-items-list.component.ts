import { Component, Input } from '@angular/core';
import { Order } from '../../../models/Order';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'order-items-list',
    templateUrl: './order-items-list.component.html',
    styleUrls: ['./order-items-list.component.css'],
    standalone: true,
    imports: [RouterLink, CurrencyPipe]
})
export class OrderItemsListComponent {

  @Input()
  order!: Order;

}
