import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './gallery/gallery.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {LearnComponent} from './learn/learn.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {LogoutComponent} from './account/logout/logout.component';
import {ManageComponent} from './account/manage/manage.component';
import {AdminComponent} from './admin/admin.component';
import {AdminGuardService} from './services/admin-guard/admin-guard.service';


const routes: Routes = [
  {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuardService]},
  {path: 'manage', component: ManageComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: 'learn', component: LearnComponent, canActivate: [AuthGuardService]},
  {path: '', component: LandingComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
