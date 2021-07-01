import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipie } from '../recipe.model';
import * as RecipiesActions from './recipies.action';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipieEffects {
  @Effect()
  fetchRecipies = this.actions$.pipe(
    ofType(RecipiesActions.FETCH_RECIPIES_RESOLVER),
    switchMap(() =>
      this.http.get<Recipie[]>(
        'https://recepie-73951-default-rtdb.firebaseio.com/recipies.json'
      )
    ),
    map((recipies) =>
      recipies.map((recipie) => ({
        ...recipie,
        ingredients: recipie.ingredients ? recipie.ingredients : [],
      }))
    ),
    map((recipes) => new RecipiesActions.FetchRecipies(recipes))
  );

  @Effect({ dispatch: false })
  storeRecipies = this.actions$.pipe(
    ofType(RecipiesActions.STORE_RECIPIES),
    withLatestFrom(this.store.select('recipies')),
    switchMap(([actionData, recipiesState]) =>
      this.http.put<Recipie[]>(
        'https://recepie-73951-default-rtdb.firebaseio.com/recipies.json',
        recipiesState.recipies
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
