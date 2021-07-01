import { Recipie } from '../recipe.model';
import * as RecipieActions from './recipies.action';

export interface State {
  recipies: Recipie[];
}

const initialState: State = {
  recipies: [],
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function recipieReducer(
  state = initialState,
  action: RecipieActions.RecipiesActions
) {
  switch (action.type) {
    case RecipieActions.ADD_RECIPIE:
      return {
        ...state,
        recipies: [...state.recipies, action.payload],
      };
    case RecipieActions.UPDATE_RECIPIE:
      const updatedRecipie = {
        ...state.recipies[action.payload.index],
        ...action.payload.newRecipie,
      };
      const updatedRecipies = [...state.recipies];
      updatedRecipies[action.payload.index] = updatedRecipie;
      return {
        ...state,
        recipies: updatedRecipies,
      };
    case RecipieActions.DELETE_RECIPIE:
      return {
        ...state,
        recipies: state.recipies.filter(
          (drecipie, recipieIndex) => recipieIndex !== action.payload
        ),
      };
    case RecipieActions.FETCH_RECIPIES:
      return {
        ...state,
        recipies: [...action.payload],
      };
    default:
      return state;
  }
}
