export interface Shop {
  id: number | null;
  label: string;
}

export interface Card {
  id: number;
  shop: Shop;
  barCode: string;
  isShoppingCard: boolean;
  isCardCode: boolean;
  password: string;
}
