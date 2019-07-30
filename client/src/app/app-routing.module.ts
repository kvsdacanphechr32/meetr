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
import { ActivityComponent } from './activity/activity.component';
import { StudiesComponent } from './studies/studies.component';

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
    path: 'callback/oauth',
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
    canActivate: [AuthGuard],
    data: {
      bg: 'white'
    }
  },
  {
    path: 'projects/:id/track',
    component: TrackComponent,
    canActivate: [AuthGuard],
    data: {
      bg: 'white'
    }
  },
  {
    path: 'track',
    component: TrackComponent,
    canActivate: [AuthGuard],
    data: {
      bg: 'white'
    }
  },
  {
    path: 'studies',
    component: StudiesComponent,
    data: {
      bg: 'white'
    }
  },
  {
    path: 'talk',
    component: ActivityComponent
  },
  {
    path: 'talk/:project-slug',
    component: ActivityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
