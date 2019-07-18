import { Component, OnInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public content: any;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {

    
    this._dataSvc.getDataForUrl('/api/data/get/about').subscribe((response: any) => {

      this.content = response[0];
      this.hasContent = true;
      
    }); 
  }

}
