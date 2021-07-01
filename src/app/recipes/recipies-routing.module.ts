import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipieResolverService } from './recipie-resolver.service';
import { RecipieStartComponent } from './recipie-start/recipie-start.component';
import { RecipiesEditComponent } from './recipies-edit/recipies-edit.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipieStartComponent,
      },
      {
        path: 'new',
        component: RecipiesEditComponent,
      },
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [RecipieResolverService],
      },
      {
        path: ':id/edit',
        component: RecipiesEditComponent,
        resolve: [RecipieResolverService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipiesRoutingModule {}
