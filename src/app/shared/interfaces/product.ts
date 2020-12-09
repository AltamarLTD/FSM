export interface Product {
  country: string;
  date: string; // suppose to be in format dd.mm.yyyy
  description: string;
  id: number;
  img: string; // img name
  name: string;
  pack: string; // suppose to be weight + 'kg'
  priceKg: number;
  pricePack: number;
}
