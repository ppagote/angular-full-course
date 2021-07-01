import * as fromSoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipie from '../recipes/store/recipies.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: fromSoppingList.State;
  recipies: fromRecipie.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromSoppingList.shoppingListReducer,
  recipies: fromRecipie.recipieReducer,
  auth: fromAuth.authReducer,
};
