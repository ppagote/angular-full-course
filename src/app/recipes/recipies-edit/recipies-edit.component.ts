import { Recipie } from './../recipe.model';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as RecipieActions from '../store/recipies.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipies-edit',
  templateUrl: './recipies-edit.component.html',
  styleUrls: ['./recipies-edit.component.css'],
})
export class RecipiesEditComponent implements OnInit, OnDestroy {
  recipie: Recipie;
  id: number;
  editMode = false;
  editRecipie: FormGroup;
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    //private recipieService: RecipiesService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id != null;
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.editRecipie.value);
    /* const recipe = new Recipie(
      this.editRecipie.get('name').value,
      this.editRecipie.get('description').value,
      this.editRecipie.get('imageUrl').value,
      this.editRecipie.get('ingredients').value
    ); */

    if (!this.editMode) {
      //this.recipieService.addRecepie(this.editRecipie.value);
      this.store.dispatch(
        new RecipieActions.AddRecipie(this.editRecipie.value)
      );
    } else {
      this.store.dispatch(
        new RecipieActions.UpdateRecipie({
          index: this.id,
          newRecipie: this.editRecipie.value,
        })
      );
      //this.recipieService.updateRecipie(this.id, this.editRecipie.value);
    }

    this.onCancel();
  }

  get controls() {
    // a getter!
    return (this.editRecipie.get('ingredients') as FormArray).controls;
  }

  onDeleteIngredient(index: number) {
    (this.editRecipie.get('ingredients') as FormArray).removeAt(index);
  }

  onAddIngredient() {
    (this.editRecipie.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]+[1-9]*$/),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private initForm() {
    let recipieName = '';
    let recipieDescription = '';
    let recipieImagePath = '';
    const recipieIngredients = new FormArray([]);

    if (this.editMode) {
      // this.recipie = this.recipieService.getRecipieById(this.id);
      this.storeSub = this.store
        .select('recipies')
        .pipe(
          map((recipeState) =>
            recipeState.recipies.find((recipie, index) => index === this.id)
          )
        )
        .subscribe((recipie) => {
          this.recipie = recipie;
          console.log(this.recipie);

          recipieName = this.recipie.name;
          recipieDescription = this.recipie.description;
          recipieImagePath = this.recipie.imagePath;

          if (this.recipie.ingredients) {
            for (const ingredient of this.recipie.ingredients) {
              console.log(ingredient);
              recipieIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[0-9]+[1-9]*$/),
                  ]),
                })
              );
            }
          }
        });
    }

    this.editRecipie = new FormGroup({
      name: new FormControl(recipieName, Validators.required),
      imagePath: new FormControl(recipieImagePath, Validators.required),
      description: new FormControl(recipieDescription, Validators.required),
      ingredients: recipieIngredients,
    });
  }
}
