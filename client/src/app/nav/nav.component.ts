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

    if(close && !document.getElementById('menu').classList.contains('open')) return;

    document.getElementById('bg').classList.toggle('white');
    document.getElementById('menu').classList.toggle('open');
    document.getElementById('menu-btn').classList.toggle('open');
    
  }

}
