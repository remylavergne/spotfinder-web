import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResetPasswordContainerComponent } from './reset-password/reset-password-container/reset-password-container.component';
import { PageNotFoundComponent } from './reset-password/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ResetPasswordContainerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
