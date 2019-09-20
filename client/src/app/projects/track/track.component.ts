import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, Form } from '@angular/forms';

import { DataService } from '../../utils/data.service';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {
  
  public projects: any[];
  public hasProjects: boolean;
  public showDropdown: boolean;
  public formError: boolean;

  public prompts: Array<string> =  
  [
    'You and your project team have strengthened your network.',
    'People in the project’s network are communicating with each other (without you).',
    'You have created new opportunities for people to participate.', 
    'You have made progress in assuring that event participants are broadly representative.', 
    'Participants feel more comfortable voicing their opinion.', 
    'There are elements of the project that can be taken up by people outside of your organization.', 
    'You are more able to share the process and outcomes of your work with project participants.', 
    'You have shared successes and failures of the project with your wider professional network.', 
    'You feel confident that the project will continue to have value for participants beyond the life of the project.', 
    'You are confident that people in the project’s network will maintain their connections beyond the life of the project.', 
    'You and your project team are more able to listen and respond to your participants.', 
    'You have built more trust with the people with whom you are working.'
  ];

  private responseForm: FormGroup;
  private selectedProjectId: string;

  constructor(private _dataSvc: DataService, private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {

    let radioGroups = {};
    this.prompts.forEach((p, i) => radioGroups[i + ''] = [null, [Validators.required]]);
    this.responseForm = this._formBuilder.group(radioGroups);
   
    this._route.params.subscribe(params => {
      
      // User has projects if params provided
      if (Object.values(params).length > 0)
        this.hasProjects = true;

      // If no current internal project ID, get project data
      if (!this._dataSvc.currentProjectId && params['id']) {
        this._dataSvc.userId.subscribe(id => {

          if (id) {
            let userId = id;
            // Get user's project and cache ID
            this._dataSvc.getDataForUrl('/api/project/get/' + userId + '/' + params['id']).subscribe((response: any) => {
              this._dataSvc.currentProjectId = response.project._id
            });
          }

        });
      }
      
    });

  }

  openSelect() {

    document.querySelector('#select').classList.toggle('active')

  }

  projectSelected(id: string) {

    document.querySelector('#select').classList.remove('active');
    document.querySelector('#select span').textContent = document.getElementById(id).textContent;

    this.selectedProjectId = id;
    this.responseForm.reset();


  }

  submitNew() {
    
    // Check if all responses filled
    let formFinished = _.every(this.responseForm.value, (v) => {return v !== null});
    if(!formFinished) {
      this.formError = true;
      return;
    }
    this.formError = false;

    let data = {
      projectId: this.selectedProjectId || this._dataSvc.currentProjectId,
      responses: Object.values(this.responseForm.value),
      note: (document.querySelector('#note textarea') as HTMLInputElement).value
    };

    this._dataSvc.sendDataToUrl('/api/progress/create', data).subscribe((response: any) => {

      this._router.navigate(['/projects', response.slug]);

    });
  }

  }
