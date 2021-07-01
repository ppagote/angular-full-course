import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
//import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromAuth from '../../store/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  selectedIngredient: Ingredient;
  //selectedIndex: number;
  editMode = false;
  slSubscription: Subscription;

  shoppingEdit = new FormGroup({
    name: new FormControl(null, Validators.required),
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[1-9]+[0-9]*$'),
    ]),
  });

  constructor(
    //private shoppingListService: ShoppingListService,
    private store: Store<fromAuth.AppState>
  ) {}

  ngOnInit(): void {
    this.slSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          //this.selectedIndex = stateData.editedIngredientIndex;
          this.selectedIngredient = stateData.editedIngredient;

          this.shoppingEdit.setValue({
            name: this.selectedIngredient.name,
            amount: this.selectedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });

    /* this.slSubscription = this.shoppingListService.selectedIngredient.subscribe(
      (index: number) => {
        this.selectedIndex = index;
        console.log(index);
        this.editMode = true;
        this.selectedIngredient = this.shoppingListService.getIngredient(
          this.selectedIndex
        );
        this.shoppingEdit.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount,
        });
      }
    ); */
  }

  onAddUpdate(): void {
    /* const ingredient = new Ingredient(
      this.shoppingEdit.get('name').value,
      this.shoppingEdit.get('amount').value
    ); */
    if (!this.editMode) {
      // this.shoppingListService.onAddIngredient(this.shoppingEdit.value);

      this.store.dispatch(
        new ShoppingListActions.AddIngredient(this.shoppingEdit.value)
      );
    } else {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(this.shoppingEdit.value)
      );
      /* this.shoppingListService.updateIngredients(
        this.selectedIndex,
        this.shoppingEdit.value
      ); */
    }
    this.editMode = false;
    this.shoppingEdit.reset();
  }

  onDelete(): void {
    // this.shoppingListService.onDeleteIngredient(this.selectedIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.shoppingEdit.reset();
    this.editMode = false;
  }

  onClear() {
    this.shoppingEdit.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
