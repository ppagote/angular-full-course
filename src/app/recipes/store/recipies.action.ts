import { Action } from '@ngrx/store';
import { Recipie } from '../recipe.model';

export const ADD_RECIPIE = '[Recipies] Add Recipie';
export const UPDATE_RECIPIE = '[Recipies] Update Recipie';
export const DELETE_RECIPIE = '[Recipies] Delete Recipie';
export const FETCH_RECIPIES = '[Recipies] Fetch Recipies';
export const FETCH_RECIPIES_RESOLVER = '[Recipies] Fetch Recipies Resolver';
export const STORE_RECIPIES = '[Recipies] Store Recipies';

export class StoreRecipies implements Action {
  readonly type = STORE_RECIPIES;
}

export class AddRecipie implements Action {
  readonly type = ADD_RECIPIE;
  constructor(public payload: Recipie) {}
}

export class FetchRecipies implements Action {
  readonly type = FETCH_RECIPIES;
  constructor(public payload: Recipie[]) {}
}

export class FetchRecipiesResolver implements Action {
  readonly type = FETCH_RECIPIES_RESOLVER;
}

export class UpdateRecipie implements Action {
  readonly type = UPDATE_RECIPIE;
  constructor(public payload: {index: number; newRecipie: Recipie}) {}
}

export class DeleteRecipie implements Action {
  readonly type = DELETE_RECIPIE;
  constructor(public payload: number) {}
}


export type RecipiesActions =
  | AddRecipie
  | UpdateRecipie
  | DeleteRecipie
  | FetchRecipies
  | FetchRecipiesResolver
  | StoreRecipies;
