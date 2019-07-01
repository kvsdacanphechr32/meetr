import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public profile: any;

  private newForm: FormGroup;

  constructor(private authService: AuthService, private _formBuilder: FormBuilder) {}

  async ngOnInit() {

    // Get an instance of the Auth0 client
    // this.auth0Client = await this.authService.getAuth0Client();

    // Watch for changes to the profile data
    this.authService.profile.subscribe(profile => {
      this.profile = profile;
      console.log(profile)
    });

    this.newForm = this._formBuilder.group({
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newForm.controls;
  }

  create() {
    document.getElementById('new').style.display = 'flex';
  }

  closeModal() { 

    document.getElementById('wrapper-profile').style.display = 'none';

  }

}
