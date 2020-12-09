import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(private http: HttpClient) { }

  getImgUrl(imgCode: string): string {
    return `${environment.hostUrl}/api/v2/product-catalog/product/image/${imgCode}`;
  }

  getProductList(): Observable<object> {
    return this.http.get(`${environment.hostUrl}/api/v2/product-catalog/product`);
  }

  getProductInfo(itemId: number): Observable<object> {
    return this.http.get(environment.hostUrl + `/api/v2/product-catalog/product/${itemId}`)
  }

  addItemToBasket(itemId: number): Observable<object> {
    return this.http.post(`${environment.hostUrl}/api/v2/user-management/cart/product/${itemId}`, null);
  }

  sendFeedback(name: string, email: string, message: string): Observable<object> {
    return this.http.post(`${environment.hostUrl}/api/v2/notification/feedback`, {name, email, message});
  }

  getBasket(): Observable<object> {
    return this.http.get(`${environment.hostUrl}/api/v2/user-management/cart`);
  }

  updateCartItemQuantity(quantity: number, id: number): Observable<object> {
    const params = new HttpParams().set('quantity', quantity.toString()).set('productId', id.toString());
    return this.http.put(`${environment.hostUrl}/api/v2/user-management/cart`, null, {params});
  }

  deleteItemFromCart(itemId: number): Observable<object> {
    return this.http.delete(`${environment.hostUrl}/api/v2/user-management/cart/product/${itemId}`);
  }

  clearCart(): Observable<object> {
    return this.http.delete(`${environment.hostUrl}/api/v2/user-management/cart/products`);
  }

  getOrderInfo(): Observable<object> {
    return this.http.get(`${environment.hostUrl}/api/v2/user-management/user/checkout`);
  }

  confirmOrder(userInfo: Client): Observable<object> {
    return this.http.post(`${environment.hostUrl}/api/v2/ledger/invoice/checkout/confirm`, {...userInfo});
  }

  initCart(): Observable<object> {
    return this.http.post(`${environment.hostUrl}/api/v2/user-management/cart`, null);
  }
}
