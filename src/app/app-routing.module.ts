import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormWrapComponent } from './form-wrap/form-wrap.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ReverseAuthGuard } from './shared/guards/reverse-auth.guard';
import { BusinessListComponent } from './business-list/business-list.component';

const routes: Routes = [
  {
    path: 'business',
    component: BusinessListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'form/:id',
    component: FormWrapComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ReverseAuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'business',
  },
  {
    path: '**',
    redirectTo: 'business',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
