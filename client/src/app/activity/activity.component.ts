import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, AfterViewInit {

  public activities: any[];
  public currentActivity: number = 0;
  public activityIndex: number = 0;

  private bgColors: string[] = ['pale-salmon', 'coral', 'blueberry', 'camo-green'];

  constructor(private _dataSvc: DataService) { }

  ngOnInit() {   
    
    this._dataSvc.getDataForUrl('/api/data/get/').subscribe((response: any) => {

      this.activities = response;

    }); 
  }
  
  ngAfterViewInit() {
    
    document.body.classList.value = 'activity ' + this.bgColors[this.currentActivity];

  }

}
