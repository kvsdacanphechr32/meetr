import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AuthService } from '../utils/auth.service';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profile: any;
  public isAuthenticated: boolean;
  public alreadyExists: boolean;
  public signUpShow: boolean;

  private signupForm: FormGroup;
  private signinForm: FormGroup;
  private auth0Client: Auth0Client;
  
  constructor(private authService: AuthService, private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  async ngOnInit() {

    this.signupForm = this._formBuilder.group({
      'name': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
    this.signinForm = this._formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    });

    // Get an instance of the Auth0 client
    this.auth0Client = await this.authService.getAuth0Client();

    // Watch for changes to the isAuthenticated state
    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });

    // Watch for changes to the profile data
    this.authService.profile.subscribe(profile => {
      this.profile = profile;
      this.createOrGetUser(profile);
    });

    // Prompt for login as needed
    this.authService.promptLogin.subscribe(prompt => {
      if(prompt) {
        this.signUpShow = false;
        this.showModal();
      } 
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  createOrGetUser(profile: any) {

    if(!profile) return;

    let data = {
      email: profile.email,
      name: profile.name
    };

    this._dataSvc.sendDataToUrl('/api/user/exists', data).subscribe((response: any) => {
      this._dataSvc.userId.next(response._id);
    });

  }

  showModal() { 

    document.getElementById('wrapper-profile').style.display = 'flex';

  }

  closeModal() { 

    document.getElementById('wrapper-profile').style.display = 'none';

  }

  toggleSignup() { 

    this.signUpShow = !this.signUpShow;

  }

  /**
   * Logs in the user by redirecting to Auth0 for authentication
   */
  async login(connectionType: string) {

    let body = {
      connection: connectionType,       
      redirect_uri: `${window.location.origin}/callback`
    };

    await this.auth0Client.loginWithRedirect(body);

  }

  async signup() { 
    
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let body = {
      'client_id': this.authService.config.client_id,
      'email': this.f['email'].value,
      'password': this.f['password'].value,
      'connection': 'Username-Password-Authentication',
      'name': this.f['name'].value,
    };

    const fetchReq = await fetch('https://' + this.authService.config.domain + '/dbconnections/signup', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(json => {
            return json;
        })
        .catch(err => {
          console.error(err)
        });

    if(fetchReq.code === 'user_exists')
        this.alreadyExists = true;
  }

  /**
   * Logs the user out of the applicaion, as well as on Auth0
   */
  logout() {
    this.auth0Client.logout({
      client_id: this.authService.config.client_id,
      returnTo: window.location.origin
    });
  }
}
