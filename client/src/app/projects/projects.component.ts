import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { DataService } from '../utils/data.service';
import { AuthService } from '../utils/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public userName: string;
  public errorMsg: string;

  public descLimit: number = 150;
  public descCount: number;

  public profile: any;
  public projects: any[]
  public projectSubmitted: boolean;

  public newForm: FormGroup;

  constructor(private _dataSvc: DataService, private _authSvc: AuthService, private _formBuilder: FormBuilder, private _router: Router) {}

  async ngOnInit() {

    // Watch for changes to the profile data
    this._authSvc.profile.subscribe(profile => {
      if(!profile || this.profile !== undefined) return;

      this.profile = profile;
      this.userName = profile.given_name || profile.name.split(/\s+/)[0];

    });

    let userId = this._dataSvc.userId.getValue();
    if(userId)
      this.getProjects(userId)
    else 
    {
      this._dataSvc.userId.subscribe(id => {
        if(id) this.getProjects(id);
      });
    }

    this.newForm = this._formBuilder.group({
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });

    // Show char limit on description
    (document.querySelector('#new #description') as HTMLElement).onkeyup = (el) => {
      this.descCount = (el.target as HTMLTextAreaElement).value.length;
    }

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.newForm.controls;
  }

  getProjects(userId) {

    this._dataSvc.getDataForUrl('/api/project/get/' + userId).subscribe((response: any) => {
        
      this.projects = response;

    });
  
  }

  create() {

    document.getElementById('new').style.display = 'flex';
    document.body.classList.value = '';

  }

  submitNew() {

    this.projectSubmitted = true;

    if(!this.newForm.valid) return;

    let data = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      userId: this._dataSvc.userId.getValue()
    }

    this._dataSvc.sendDataToUrl('/api/project/create', data).subscribe((response: any) => {
      
      // Hide modal
      document.getElementById('new').style.display = 'none';
      document.body.classList.value = 'white';
      this.projects.push(response);

      // Go to new project
      this._router.navigate(['projects', response.slug]);
      
    },
    (err: HttpErrorResponse) => {
      if(err.status === 409)
        this.errorMsg = 'You already have a project with that name';
    });

  }

  closeModal() { 

    document.getElementById('new').style.display = 'none';
    document.body.classList.value = 'white';

  }

}
