import { Component, OnInit } from '@angular/core';

import { TweenLite, Back } from 'gsap';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public content: any;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {
   
    this._dataSvc.getDataForUrl('/api/data/get/home').subscribe((response: any) => {

      this.content = response[0];
      this.hasContent = true;
      
    }); 
 
  }

  public next() {

    TweenLite.to(document.getElementById('first'), 1, {x: '-100%', display: 'none', ease: Back.easeIn, onComplete:() => {
      TweenLite.fromTo(document.getElementById('second'), 1, {x: '100%'}, {x: '0%', display: 'flex', ease: Back.easeOut});
    }});

  }

}
