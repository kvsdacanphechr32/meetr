import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

import { MenuComponent } from '../menu/menu.component';
import { DataService } from '../utils/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  constructor(private _router: Router, private _dataSvc: DataService) {
    
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
    // Close menu when nav starts
      this.openCloseNav(true);
    });
  
  }

  openCloseNav(close: boolean) {

    let menuClass = document.getElementById('menu').classList;

    if(close && !menuClass.contains('open')) return;

    menuClass.toggle('open');
    document.getElementById('menu-btn').classList.toggle('open');

    this._dataSvc.menuOpen.next(menuClass.contains('open'));    

    // document.getElementById('bg').classList.toggle('white');

  }

}
