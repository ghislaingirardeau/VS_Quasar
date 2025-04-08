import { Card } from './cards';
import { List } from './lists';
import { ShoppingItem } from './shopping';

export interface AddPromiseError {
  nameAlreadyUsed?: string;
  cardAlreadyExist?: string;
  message: string;
  success: boolean;
}

export type DataProperty =
  | 'lists'
  | 'cards'
  | 'currentShopping'
  | 'shoppingList';

export interface AppDatas {
  shoppingData: ShoppingItem[];
  lists: List[];
  cards: Card[];
}
