import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './utils/callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectComponent } from './projects/project/project.component';
import { HomeComponent } from './home/home.component';
import { TrackComponent } from './projects/track/track.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './utils/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      bg: ''
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      bg: 'white'
    }
  },
  {
    path: 'callback',
    component: CallbackComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
    data: {
      bg: 'white'
    }
  },
  {
    path: 'projects/:id',
    component: ProjectComponent,
    data: {
      bg: 'white'
    }
  },
  {
    path: 'projects/:id/track',
    component: TrackComponent,
    data: {
      bg: 'white'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
