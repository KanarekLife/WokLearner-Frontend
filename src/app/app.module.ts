import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {GalleryComponent} from './gallery/gallery.component';
import {LearnComponent} from './learn/learn.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingComponent} from './landing/landing.component';
import {LogoutComponent} from './account/logout/logout.component';
import {ManageComponent} from './account/manage/manage.component';
import {AdminComponent} from './admin/admin.component';
import {PaintingsComponent} from './admin/paintings/paintings.component';
import {UsersComponent} from './admin/users/users.component';
import {LoadingComponent} from './shared/helpers/loading/loading.component';
import {PaginationComponent} from './shared/helpers/pagination/pagination.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    GalleryComponent,
    LearnComponent,
    PageNotFoundComponent,
    LandingComponent,
    LogoutComponent,
    ManageComponent,
    AdminComponent,
    PaintingsComponent,
    UsersComponent,
    LoadingComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
