import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceConfigurationFormComponent } from './form-wrap/service-configuration-form/service-configuration-form.component';
import { FormWrapComponent } from './form-wrap/form-wrap.component';
import { BusinessFormComponent } from './form-wrap/business-form/business-form.component';
import { ServiceConfigFormComponent } from './form-wrap/service-config-form/service-config-form.component';
import { AdditionalDocsComponent } from './form-wrap/additional-docs/additional-docs.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessItemComponent } from './business-list/business-item/business-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorsService } from './shared/services/interceptors.service';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { UserWrapComponent } from './form-wrap/user-wrap/user-wrap.component';
import { UserFormComponent } from './form-wrap/user-wrap/user-form/user-form.component';
import { EditAdditionalDocComponent } from './form-wrap/additional-docs/edit-additional-doc/edit-additional-doc.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FormWrapComponent,
    BusinessFormComponent,
    ServiceConfigFormComponent,
    ServiceConfigurationFormComponent,
    AdditionalDocsComponent,
    BusinessListComponent,
    BusinessItemComponent,
    UserWrapComponent,
    UserFormComponent,
    EditAdditionalDocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    AuthModule
  ],
  entryComponents: [UserFormComponent, EditAdditionalDocComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
