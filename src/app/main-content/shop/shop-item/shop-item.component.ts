import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../../../shared/services/basket.service';
import {ActivatedRoute} from '@angular/router';
import {take} from 'rxjs/operators';
import {HttpService} from '../../../shared/services/http.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Product} from '../../../shared/interfaces/product';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit, OnDestroy {

  item: Product;

  constructor(private http: HttpService, public basket: BasketService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get item info
    const itemId = +this.route.snapshot.queryParamMap.get('id');

    this.http.getProductInfo(itemId).pipe(untilDestroyed(this)).subscribe((res: {code: number, message: string, result: Product}) => {
      this.item = res.result;
    });
  }

  addToBasket() {
    this.http.addItemToBasket(this.item.id).pipe(take(1), untilDestroyed(this)).subscribe((res: any) => {
      this.basket.addItem(this.item.id);
    });
  }

  getImg(imgCode: string) {
    return this.http.getImgUrl(imgCode);
  }

  ngOnDestroy() {
  }

}
