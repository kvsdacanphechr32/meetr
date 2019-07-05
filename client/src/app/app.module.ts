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
import { CdnImageComponent } from './utils/cdn-image/cdn-image.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './projects/project/project.component';

// Cloudinary
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './cdn.config';

export const cloudinary = {
  Cloudinary: CloudinaryCore
};
export const config: CloudinaryConfiguration = cloudinaryConfiguration;

@NgModule({
  declarations: [
    CdnImageComponent,
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
    HttpClientModule,
    CloudinaryModule.forRoot(cloudinary, config),
  ],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
