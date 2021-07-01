import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../auth/store/auth.action';
import * as RecipiesAction from '../recipes/store/recipies.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  userSubscripton: Subscription;

  constructor(
    /* private dataStorageService: DataStorageService,
    private authService: AuthService, */
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.userSubscripton = this.store
      .select('auth')
      .pipe(map((authState) => authState.user))
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }

  onSave() {
    //this.dataStorageService.saveRecipie();
    this.store.dispatch(new RecipiesAction.StoreRecipies());
  }

  onFetch() {
    this.store.dispatch(new RecipiesAction.FetchRecipiesResolver());
    //this.dataStorageService.fetchRecipie().subscribe();
  }

  onLogout() {
    //this.authService.logout();
    this.store.dispatch(new AuthActions.LogOut());
  }

  ngOnDestroy() {
    this.userSubscripton.unsubscribe();
  }
}
