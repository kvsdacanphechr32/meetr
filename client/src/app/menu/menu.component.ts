import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public isAuthenticated: boolean;
  private currentUrl: string;
  // @ViewChild('menu') menu: ElementRef;
  
  constructor(private _router: Router, private authService: AuthService) { 

    // Close menu when nav starts
    _router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
      // this.closeNav();
    });
  
    // Get nav route when nav ends
    _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.currentUrl = _router.url;
    });

    // Watch for changes to the isAuthenticated state
    this.authService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });
  }

  ngOnInit() {
  }

  // Is passed route active?
  itemActive(route: string) {

    return '/'+route == this.currentUrl;

  }
}
