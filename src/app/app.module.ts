import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MainServiceFormComponent } from './form-wrap/main-service-form/main-service-form.component';
import { LoginComponent } from './login/login.component';
import { FormWrapComponent } from './form-wrap/form-wrap.component';
import { BusinessFormComponent } from './form-wrap/business-form/business-form.component';
import { ServiceFormComponent } from './form-wrap/service-form/service-form.component';
import { AdditionalDocsComponent } from './form-wrap/additional-docs/additional-docs.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessItemComponent } from './business-list/business-item/business-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsService } from './shared/services/interceptors.service';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { UserWrapComponent } from './form-wrap/user-wrap/user-wrap.component';
import { UserFormComponent } from './form-wrap/user-wrap/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FormWrapComponent,
    BusinessFormComponent,
    ServiceFormComponent,
    MainServiceFormComponent,
    AdditionalDocsComponent,
    BusinessListComponent,
    BusinessItemComponent,
    UserWrapComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
  ],
  entryComponents: [UserFormComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
