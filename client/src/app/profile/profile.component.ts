import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AuthService } from '../utils/auth.service';
import { DataService } from '../utils/data.service';

import * as auth0 from 'auth0-js';

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
  public signUpSubmitted: boolean;
  public signInSubmitted: boolean;
  public authInit: boolean;

  public hideCloseButton: boolean;

  public errorMsg: string;
  public errorForgot: boolean;

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

      if(!profile) return;

      this.profile = profile;
      this.createOrGetUser(profile);

    });

    // Prompt for login as needed
    this.authService.promptLogin.subscribe(prompt => {
      if(prompt) {
        this.signUpShow = false;
        this.showModal(false);
      }
    });

    // Prompt for signup as needed (mostly from home)
    /* this.authService.prompSignup.subscribe(prompt => {
      if(prompt) {
        this.signUpShow = true;
        this.showModal();
      }
    }); */

    this.authInit = true;

  }

  // convenience getter for easy access to form fields
  get suForm() {
    return this.signupForm.controls;
  }
  get siForm() {
    return this.signinForm.controls;
  }

  createOrGetUser(profile: any) {

    if(!profile) return;

    let data = {
      sub: profile.sub,
      email: profile.email,
      name: profile.name,
      img: profile.picture
    };

    this._dataSvc.sendDataToUrl('/api/user/exists', data).subscribe((response: any) => {
      this._dataSvc.userId.next(response._id);
    });

  }

  showModal(allowClose = true) {
    this.hideCloseButton = !allowClose;

    document.getElementById('wrapper-profile').style.display = 'flex';
    document.getElementById('nav').classList.add('open');

    // Always be at top of page
    window.scrollTo(0, 0);

  }

  closeModal() {

    document.getElementById('wrapper-profile').style.display = 'none';
    document.getElementById('nav').classList.remove('open');

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

  // Login via user/pass
  loginViaDatabase(emailOverride: string, passOverride: string) {

    this.signInSubmitted = true;
    if(!emailOverride && !this.signinForm.valid) return;

    let email = !emailOverride ? this.signinForm.controls['email'].value : emailOverride;
    let pass = !passOverride ? this.signinForm.controls['password'].value : passOverride;

    this.authService.loginUserPass(email, pass).subscribe((res) => {

      if(res !== undefined && (res.code === 'access_denied' || res.code === 'too_many_attempts'))
        this.errorMsg = res.description;

    });

  }

  async signup() {

    this.signUpSubmitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    let body = {
      'client_id': this.authService.config.client_id,
      'email': this.suForm['email'].value,
      'password': this.suForm['password'].value,
      'connection': 'Username-Password-Authentication',
      'name': this.suForm['name'].value,
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

    if(fetchReq.code === 'user_exists' || fetchReq.code === 'invalid_signup')
        this.alreadyExists = true;

    // Login if signup works
    if(fetchReq['_id'])
      this.loginViaDatabase(body['email'], body['password']);

  }

  // Forgot pass
  async forgot() {

    if(!this.siForm['email'].valid) {
      this.errorForgot = true;
      return;
    }

    let body = {
      'client_id': this.authService.config.client_id,
      'email': this.siForm['email'].value,
      'connection': 'Username-Password-Authentication'
    };

    const fetchReq = await fetch('https://' + this.authService.config.domain + '/dbconnections/change_password', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            return res;
        })
        .catch(err => {
          console.error(err)
        });

    if(fetchReq['ok'] === true)
      document.getElementById('forgot').innerText = 'Please check your email to reset your password.';

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
