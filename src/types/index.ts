export type Item = {
  id: number;
  name: string;
  description: string;
};

export type ShoppingItem = {
  id?: string;
  title: string;
  quantity: number;
  category: Category;
  is_purchased?: boolean;
};

export type Category = {
  id: number;
  title: string;
  shortcut: string;
  color?: string;
};
