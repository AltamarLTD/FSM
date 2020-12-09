import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../../shared/services/basket.service';
import {environment} from '../../../environments/environment';
import {take} from 'rxjs/operators';
import {HttpService} from '../../shared/services/http.service';
import {Product} from '../../shared/interfaces/product';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  list: Product[];

  constructor(private http: HttpService, private basket: BasketService) { }

  ngOnInit(): void {
    this.http.getProductList().pipe(untilDestroyed(this)).subscribe((res: {code: number, message: string, result: Product[]}) => {
      this.list = res.result;
    });
  }

  getImg(imgCode: string): string{
    return this.http.getImgUrl(imgCode);
  }

  addToBasket(id){
    this.http.addItemToBasket(id).pipe(take(1), untilDestroyed(this)).subscribe((res: any) => {
      this.basket.addItem(id);
    });
  }

  ngOnDestroy() {

  }

}
