import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main-content/main-page/main.module').then(m => m.MainModule) },
  { path: 'import-page', loadChildren: () => import('./main-content/import-page/import.module').then(m => m.ImportModule) },
  { path: 'shop', loadChildren: () => import('./main-content/shop/shop.module').then(m => m.ShopModule) },
  { path: 'contacts', loadChildren: () => import('./main-content/contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'basket', loadChildren: () => import('./main-content/basket/basket.module').then(m => m.BasketModule) },
  { path: 'order-checkout', loadChildren: () => import('./main-content/order-checkout/checkout.module').then(m => m.CheckoutModule) },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
