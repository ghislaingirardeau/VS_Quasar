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
