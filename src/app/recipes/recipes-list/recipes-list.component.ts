import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
//import { RecipiesService } from '../recipies.service';
import { Recipie } from './../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  recipies: Recipie[] = [];
  recSub: Subscription;

  constructor(
    //private recipieService: RecipiesService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    //this.recipies = this.recipieService.getRecipieList();
    this.recSub = this.store
      .select('recipies')
      .pipe(map((recipiesState) => recipiesState.recipies))
      .subscribe((recipie: Recipie[]) => {
        this.recipies = recipie;
      });
    /* this.recipieService.recipieChanged.subscribe((recipie: Recipie[]) => {
      this.recipies = recipie;
    }); */
    //this.recipies = this.recipieService.getRecipieList();
    console.log(this.recipies);
  }

  onAddRecepie(): void {
    this.router.navigate(['/recipie/new']);
  }

  ngOnDestroy() {
    this.recSub.unsubscribe();
  }
}
