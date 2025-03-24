export interface Item {
  id: number;
  title: string;
  description: string;
  list_id: number;
  created_at: Date;
}

export interface FormList {
  id: number;
  name: string;
  updated_at: null | Date;
}

export interface List extends FormList {
  items: Item[];
}
