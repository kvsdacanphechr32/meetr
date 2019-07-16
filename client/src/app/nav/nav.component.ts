import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private _router: Router) {
    
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    // Close menu when nav starts
      this.openCloseNav(true);
    });
  
  }

  /**
   * Handle component initialization
   */
  ngOnInit() {

  }

  openCloseNav(close: boolean) {

    let menuClass = document.getElementById('menu').classList;

    if(close && !menuClass.contains('open')) return;

    menuClass.toggle('open');
    document.getElementById('bg').classList.toggle('white');
    document.getElementById('menu-btn').classList.toggle('open');

  }

}
