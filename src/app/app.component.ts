import { Component } from '@angular/core';
import {BasketService} from './shared/services/basket.service';
import {take} from 'rxjs/operators';
import {HttpService} from './shared/services/http.service';
import {CartItem} from './shared/interfaces/cart-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private basketService: BasketService, private http: HttpService) {
    this.http.initCart().pipe(take(1)).subscribe((res: {
      code: number,
      message: string,
      result: {
        sum: number,
        cartItems: CartItem[]
      }
    }) => {
      res.result.cartItems.forEach(item => this.basketService.addItem(item.productDTO.id));
    });
  }
}
