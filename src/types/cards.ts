export interface Shop {
  id: number | null;
  label: string;
}

export interface Card {
  id: number;
  shop: Shop;
  barCode: number;
  isShoppingCard: boolean;
  isCardCode: boolean;
  password: string;
}
