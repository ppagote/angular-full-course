//import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //ingredients: Ingredient[] = [];
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  selectedIngredient: Ingredient;
  //private ingredientSubscription: Subscription;
  constructor(
    //private shoppingListService: ShoppingListService,
    private store: Store<fromAuth.AppState>
  ) {}

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    /* this.ingredients = this.shoppingListService.getIngredientsList();
    this.ingredientSubscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientList: Ingredient[]) => {
        this.ingredients = ingredientList;
      }
    ); */
  }

  onSelect(index: number): void {
    console.log(index);
   // this.shoppingListService.selectedIngredient.next(index);
   this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.ingredientSubscription.unsubscribe();
  }
}
