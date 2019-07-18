import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private _router: Router) {
    
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    // Close menu when nav starts
      this.openCloseNav(true);
    });
  
  }

  openCloseNav(close: boolean) {

    let menuClass = document.getElementById('menu').classList;

    if(close && !menuClass.contains('open')) return;

    document.getElementById('menu').style.display = 'block';
    menuClass.toggle('open');
    document.getElementById('bg').classList.toggle('white');
    document.getElementById('menu-btn').classList.toggle('open');

  }

}
