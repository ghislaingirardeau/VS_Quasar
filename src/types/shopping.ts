export interface Category {
  id: number;
  title: string;
  shortcut: string;
  color?: string;
}

export interface ShoppingItem {
  id?: string;
  title: string;
  quantity: number;
  category: Category;
  is_purchased?: boolean;
}
