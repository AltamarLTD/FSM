import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private _basketItems = new Set();

  constructor() { }

  addItem(id) {
    this._basketItems.add(id);
  }

  removeItem(id) {
    this._basketItems.delete(id);
  }

  clear() {
    this._basketItems.clear();
  }

  get basketItemsAmount(): number {
    return this._basketItems.size;
  }
}
