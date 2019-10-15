import { Component, OnInit } from '@angular/core';

import { DataService } from '../utils/data.service';

import * as ismobile from 'ismobilejs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public content: any;
  public hasContent: boolean;
  public isDesktop: boolean;

  constructor(private _dataSvc: DataService) { 

    this.isDesktop = !ismobile.phone && !ismobile.tablet;

  }

  ngOnInit() {
   
    this._dataSvc.getDataForUrl('/api/data/get/home').subscribe((response: any) => {

      this.content = response[0];
      this.hasContent = true;
      
    }); 
 
  }

}
