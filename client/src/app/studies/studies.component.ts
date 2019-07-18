import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import * as _ from 'underscore';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrls: ['./studies.component.scss']
})
export class StudiesComponent implements OnInit {

  public intro: any;
  public content: any;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
    
    this._dataSvc.getDataForUrl('/api/data/get/studies').subscribe((response: any) => {

      this.intro = response[0].caseStudiesIntro;
      this.content = response[1];
      this.hasContent = true;
      
    }); 

  }

  toggleStudy(evt: Event) {
    
    let items = document.querySelectorAll('#studies ul li');
    _.each(items, (item) => {
      item.classList.remove('active');
    });
    (<Element>evt.currentTarget).classList.toggle('active');

  }

}