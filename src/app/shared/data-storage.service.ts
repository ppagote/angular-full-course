import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipie } from '../recipes/recipe.model';
import { RecipiesService } from '../recipes/recipies.service';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipieActions from '../recipes/store/recipies.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipieService: RecipiesService,
    private store: Store<fromApp.AppState>,
  ) { }

  saveRecipie() {
    const recipies = this.recipieService.getRecipieList();
    this.http
      .put<Recipie[]>(
        'https://recepie-73951-default-rtdb.firebaseio.com/recipies.json',
        recipies
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  fetchRecipie() {

    return this.http
      .get<Recipie[]>(
        'https://recepie-73951-default-rtdb.firebaseio.com/recipies.json'
      ).pipe(
        map((recipies) =>
          recipies.map((recipie) => ({
            ...recipie,
            ingredients: recipie.ingredients ? recipie.ingredients : [],
          }))
        ),
        tap((response) => {
          console.log(response);
          //this.recipieService.setRecipies(response);
          this.store.dispatch(new RecipieActions.FetchRecipies(response));
        }));


  }
}
