import {Product} from './product';

export interface CartItem {
  productDTO: Product;
  amount: number;
  quantity: number;
}
