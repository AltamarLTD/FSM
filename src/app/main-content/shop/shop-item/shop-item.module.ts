import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopItemRoutingModule } from './shop-item-routing.module';
import { ShopItemComponent } from './shop-item.component';


@NgModule({
  declarations: [ShopItemComponent],
  imports: [
    CommonModule,
    ShopItemRoutingModule
  ]
})
export class ShopItemModule { }
