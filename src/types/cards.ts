export interface Shop {
  id: number | null;
  label: string;
}

export interface Barcode {
  code: string;
  format: string;
}

export interface Card {
  id: number;
  shop: Shop;
  barcode: Barcode;
  isShoppingCard: boolean;
  isCardCode: boolean;
  password: string;
  color: string | null;
}
