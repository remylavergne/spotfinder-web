import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordContainerComponent } from './reset-password/reset-password-container/reset-password-container.component';
import { PageNotFoundComponent } from './reset-password/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: 'reset-password', component: ResetPasswordContainerComponent},
  {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
