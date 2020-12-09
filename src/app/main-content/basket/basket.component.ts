import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../../shared/services/basket.service';
import {take} from 'rxjs/operators';
import {HttpService} from '../../shared/services/http.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Product} from '../../shared/interfaces/product';
import {ResponseCode} from '../../shared/emuns/response-code.enum';
import {CartItem} from '../../shared/interfaces/cart-item';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  basketList: {
    productDTO: Product;
    amount: number;
    quantity: number;
    dirty: boolean;
  }[] = [];
  totalPrice = 0;

  constructor(public basket: BasketService, private http: HttpService) { }

  ngOnInit(): void {
    this.http.getBasket().pipe(untilDestroyed(this)).subscribe((res: {code: number, message: string,
      result: {sum: number, cartItems: CartItem[]}}) => {
      this.basketList = res.result.cartItems.map(el => ({...el, dirty: false}));
      this.totalPrice = res.result.sum;
    });
  }

  getImg(imgCode: string): string{
    return this.http.getImgUrl(imgCode);
  }

  updateQuantity(item: {productDTO: Product, amount: number, quantity: number, dirty: boolean}) {
    this.http.updateCartItemQuantity(item.quantity, item.productDTO.id).pipe(take(1), untilDestroyed(this)).subscribe((res: {code: number, message: string,
      result: {sum: number, cartItems: CartItem[]}}) => {
      if (res.code === ResponseCode.Success) {
        item.dirty = false;
        this.totalPrice = res.result.sum;
      }
    });
  }

  removeItem(id: number) {
    this.http.deleteItemFromCart(id).pipe(take(1), untilDestroyed(this)).subscribe((res: {code: number, message: string, result: string}) => {
      if (res.code === ResponseCode.Success) {
        this.basketList = this.basketList.filter(el => el.productDTO.id !== id);
        this.basket.removeItem(id);
      }
    });
  }

  removeAll() {
    this.http.clearCart().pipe(take(1), untilDestroyed(this)).subscribe((res: {code: number, message: string, result: string}) => {
      if (res.code === ResponseCode.Success) {
        this.basketList = [];
        this.basket.clear();
      }
    });
  }

  ngOnDestroy() {
  }

}
