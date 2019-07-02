import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public profile: any;
  public projects: any[]

  private newForm: FormGroup;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder) {}

  async ngOnInit() {

    let userId = this._dataSvc.userId.getValue();
    if(userId)
      this.getProjects(userId)
    else 
    {
      this._dataSvc.userId.subscribe(id => {
        this.getProjects(id);
      });
    }
    this.newForm = this._formBuilder.group({
      'name': ['', [Validators.required]],
      'description': ['', [Validators.required]]
    });

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

  }

  submitNew() {

    let data = {
      name: this.f['name'].value,
      description: this.f['description'].value,
      userId: this._dataSvc.userId
    }

    this._dataSvc.sendDataToUrl('/api/project/create', data).subscribe((response: any) => {

    });

  }

  closeModal() { 

    document.getElementById('wrapper-profile').style.display = 'none';

  }

}
