import { Component, OnInit } from '@angular/core';

import { TweenLite, Back } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  public next() {

    TweenLite.to(document.getElementById('first'), 1, {x: '-100%', display: 'none', ease: Back.easeIn, onComplete:() => {
      TweenLite.fromTo(document.getElementById('second'), 1, {x: '100%'}, {x: '0%', display: 'grid', ease: Back.easeOut});
    }});

  }

}
