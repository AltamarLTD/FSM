import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, take} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {BasketService} from '../../shared/services/basket.service';
import {Client} from '../../shared/interfaces/client';
import {Product} from '../../shared/interfaces/product';
import {CartItem} from '../../shared/interfaces/cart-item';
import {HttpService} from '../../shared/services/http.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ResponseCode} from '../../shared/emuns/response-code.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  orderInWork: {
    date: string;
    id: number;
    sum: number;
    invoiceProductsDto: Product[]
  } = null;
  user: Client = {
    name: null,
    surname: null,
    company: null,
    country: null,
    city: null,
    region: null,
    phone: null,
    email: null
  };
  order: {sum: number, cartItems: CartItem[]};
  errorStatus: string;

  constructor(private http: HttpService, private basket: BasketService) { }

  ngOnInit(): void {
    this.http.getOrderInfo().pipe(untilDestroyed(this)).subscribe((res: {
      code: number,
      message: string,
      result: {
        user: Client,
        cart: {sum: number, cartItems: CartItem[]}
      }
    }) => {
      this.order = res.result.cart;
      if (res.result.user) {
        this.user = res.result.user;
      }
    });
  }

  confirmOrder() {
    this.errorStatus = null;
    this.http.confirmOrder(this.user).pipe(catchError(this.handleError.bind(this)), take(1), untilDestroyed(this)).subscribe((res: any) => {
      if (res.code === ResponseCode.Success) {
        this.orderInWork = res.result;
        this.basket.clear();
        // init cart again
        this.http.initCart().pipe(take(1), untilDestroyed(this)).subscribe((res: any) => { });
      }
    });
  }

  handleError(error: HttpErrorResponse){
    this.errorStatus = `${error.error.code}, ${error.error.message}`;
    return throwError(error);
  }

  ngOnDestroy() {
  }
}
