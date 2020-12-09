import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopItemComponent } from './shop-item.component';

const routes: Routes = [{ path: '', component: ShopItemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopItemRoutingModule { }
