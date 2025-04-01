export interface AddPromiseError {
  nameAlreadyUsed?: string;
  cardAlreadyExist?: string;
  success: boolean;
}

export type DataProperty = 'lists' | 'cards' | 'shoppingList';
