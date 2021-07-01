import { of } from 'rxjs';
import { Recipie } from './recipe.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipiesActions from './store/recipies.action';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipieResolverService implements Resolve<Recipie[]> {
  constructor(
    //private dataStorageService: DataStorageService,
    //private recipieService: RecipiesService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) /* : Observable<Recipie[]> | Promise<Recipie[]> | Recipie[] */ {
    //const recipies = this.recipieService.getRecipieList();
    console.log('here');
    return this.store.select('recipies').pipe(
      take(1),
      map((recipeState) => recipeState.recipies),
      switchMap((recipies) => {
        if (recipies.length === 0) {
          this.store.dispatch(new RecipiesActions.FetchRecipiesResolver());
          return this.actions$.pipe(
            ofType(RecipiesActions.FETCH_RECIPIES),
            take(1)
          );
        } else {
          return of(recipies);
        }
      })
    );
  }
}
