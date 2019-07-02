import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { CallbackComponent } from './utils/callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectsComponent } from './projects/projects.component';
import { TrackComponent } from './projects/track/track.component';

import { DataService } from './utils/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './projects/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    CallbackComponent,
    ProfileComponent,
    MenuComponent,
    ProjectsComponent,
    HomeComponent,
    TrackComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
