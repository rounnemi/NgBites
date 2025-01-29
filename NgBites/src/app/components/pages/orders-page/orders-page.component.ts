import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NgIf, NgClass, NgFor, CurrencyPipe, DatePipe, CommonModule } from '@angular/common';
import { TitleComponent } from '../../shared/title/title.component';
import { Order } from '../../../models/Order';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    NgIf,
    RouterLink,
    NgClass,
    NgFor,
    NotFoundComponent,
    CurrencyPipe,
    DatePipe,
    
  ],
})
export class OrdersPageComponent {
  orders$!: Observable<Order[]>;
  allStatus$!: Observable<string[]>;
  filter?: string;

  constructor(activatedRoute: ActivatedRoute, orderService: OrderService) {
    // Fetch filtered orders based on route parameters
    this.orders$ = activatedRoute.params.pipe(
      switchMap((params) => {
        this.filter = params['filter'] || '';
        return orderService.getAll(this.filter);
      })
    );

    // Fetch all statuses
    this.allStatus$ = orderService.getAllStatus();
  }
}
