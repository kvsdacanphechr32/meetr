import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../utils/data.service';

import { TweenLite } from 'gsap';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';

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
  
  customOptions: OwlOptions = {
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    items: 1,
    navSpeed: 700
  }
  constructor(private _dataSvc: DataService) { }

  ngOnInit() {   
    
    this._dataSvc.getDataForUrl('/api/data/get/').subscribe((response: any) => {

      this.activities = response;
      
    }); 
  }
  
  ngAfterViewInit() {
    
    document.body.classList.value = 'activity ' + this.bgColors[this.currentActivity];
    
  }

  gotoNext() {

    TweenLite.to(document.querySelector('.activity.a_' + this.currentActivity), 1.2, {scale:0, opacity:0, display: 'none', onComplete:() => {
      TweenLite.fromTo(document.querySelector('.activity.a_' + this.currentActivity), 1.2, {scale:0, opacity:0}, {scale:1, opacity:1, display: 'block'});
    }});
    
    this.currentActivity++;
    
    TweenLite.to(document.getElementById('bg'), .7, {css: {filter: 'opacity(0.5)'}, onComplete:() => {
    
      document.body.classList.value = 'activity ' + this.bgColors[this.currentActivity];
      TweenLite.to(document.getElementById('bg'), .7, {css: {filter: 'opacity(1)'}});
    
    }});
  }

  sliderInit(activityIndex: Number) {

    setTimeout(() => {
      let dots = document.querySelector('.activity.a_' + activityIndex + ' .owl-dots');
      dots.appendChild(document.querySelector('.activity.a_' + activityIndex + ' .arrow'));
    }, 100);

  }

  slideChange(data: SlidesOutputData, activityIndex: Number) {
    
    let slidesNum = document.querySelectorAll('.activity.a_' + activityIndex + ' .owl-item').length;
    let dots = document.querySelector('.activity.a_' + activityIndex + ' .owl-dots');
    
    if(slidesNum-1 === data.startPosition)
      dots.classList.add('end');
    else
      dots.classList.remove('end');

  }

}
