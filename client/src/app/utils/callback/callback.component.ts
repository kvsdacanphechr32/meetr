import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private activated: ActivatedRoute) {}

  async ngOnInit() {

    if(this.router.url.indexOf('/oauth') > 0) {
      this.handleOAuth();
      return;
    }

    const client = await this.authService.getAuth0Client();

    // Handle the redirect from Auth0
    const result = await client.handleRedirectCallback();
    
    // Get the URL the user was originally trying to reach
    const targetRoute =
      result.appState && result.appState.target ? result.appState.target : '/projects';
    // Update observables

    this.authService.isAuthenticated.next(await client.isAuthenticated());
    this.authService.profile.next(await client.getUser())

    // Redirect away
    this.router.navigate([targetRoute]);


  }

  handleOAuth() {

    this.authService.parseLoginResult().subscribe(profile => {
      
      this.authService.profile.next(profile);
      this.authService.isAuthenticated.next(true);
      // debugger

      // setTimeout(() => {
        this.router.navigate(['/projects']).then(e => {
          console.log(e)
        });

      // }, 5000)
      
    }, err => {
      console.error(err);
    });

  }
}