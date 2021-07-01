/* import { Router } from '@angular/router'; */
import { Observable, Subscription } from 'rxjs';
/* import { AuthService, AuthResponseData } from './auth.service'; */
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private componentSub: Subscription;
  private storeSub: Subscription;


  constructor(
    //private authService: AuthService,
    //private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    console.log(form);

    //let authObs: Observable<AuthResponseData>;

    //this.isLoading = true;
    if (this.isLoginMode) {
      //authObs = this.authService.login(form.value.email, form.value.password);
      this.store.dispatch(
        new AuthActions.LoginStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    } else {
      //authObs = this.authService.signUp(form.value.email, form.value.password);

      this.store.dispatch(
        new AuthActions.SignupStart({
          email: form.value.email,
          password: form.value.password,
        })
      );
    }

    /* authObs.subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipie']);
      },
      (errorMessage) => {
        console.error(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    ); */

    form.reset();
  }

  onHandleError() {
    //this.error = null;
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy() {
    if (this.componentSub) {
      this.componentSub.unsubscribe();
    }
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  private showErrorAlert(errorMessage: string) {
    const alertCompFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompFactory);
    componentRef.instance.message = errorMessage;
    this.componentSub = componentRef.instance.close.subscribe(() => {
      this.componentSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
