import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private currentUrl: string;
  // @ViewChild('menu') menu: ElementRef;
  
  constructor(private _router: Router) { 

    // Close menu when nav starts
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      // this.closeNav();
    });
  
    // Get nav route when nav ends
    _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.currentUrl = _router.url;
    });

  }

  ngOnInit() {
  }


  // Is passed route active?
  itemActive(route: string) {

    return '/'+route == this.currentUrl;

  }
}
