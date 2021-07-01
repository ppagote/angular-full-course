import { Recipie } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipieActions from '../store/recipies.action';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css'],
})
export class RecipesDetailComponent implements OnInit {
  recipie: Recipie;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    console.log('here');
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.store
        .select('recipies')
        .pipe(
          map((recipieState) =>
            recipieState.recipies.find((recipies, index) => index === this.id)
          )
        )
        .subscribe((recipie) => {
          this.recipie = recipie;
        });
      //this.recipie = this.recipieService.getRecipieById(this.id);
      console.log(this.recipie);
    });
  }

  addToShoppingList() {
    //this.recipieService.addIngredients(this.recipie.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipie.ingredients));
  }

  onEditRecipie() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipie() {
    //this.recipieService.deleteRecepie(this.id);
    this.store.dispatch(new RecipieActions.DeleteRecipie(this.id));
    this.router.navigate(['/recipie']);
  }
}
