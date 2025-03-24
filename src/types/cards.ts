export interface Shop {
  id: number | null;
  label: string;
}

export interface Card {
  id: number;
  shop: Shop;
  barcode: string;
  isShoppingCard: boolean;
  isCardCode: boolean;
  password: string;
  color: string | null;
}
