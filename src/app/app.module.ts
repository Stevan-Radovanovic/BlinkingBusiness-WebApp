import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { FormWrapComponent } from './form-wrap/form-wrap.component';
import { BusinessFormComponent } from './form-wrap/business-form/business-form.component';
import { ServiceFormComponent } from './form-wrap/service-form/service-form.component';
import { FormSubmitComponent } from './form-wrap/form-submit/form-submit.component';
import { MatIconModule } from '@angular/material/icon';
import { MainServiceFormComponent } from './form-wrap/main-service-form/main-service-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormWrapComponent,
    BusinessFormComponent,
    ServiceFormComponent,
    FormSubmitComponent,
    MainServiceFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormSubmitComponent],
})
export class AppModule {}
