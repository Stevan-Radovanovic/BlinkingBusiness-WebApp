import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainFormComponent } from './main-form/main-form.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ReverseAuthGuard } from './shared/guards/reverse-auth.guard';

const routes: Routes = [
  {
    path: 'form',
    component: MainFormComponent,
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
    redirectTo: 'form',
  },
  {
    path: '**',
    redirectTo: 'form',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
