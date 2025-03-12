export type Item = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
};

export type List = {
  id: number;
  name: string;
  updated_at: null | Date;
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
