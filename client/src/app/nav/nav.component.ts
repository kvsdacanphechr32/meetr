import { Component, OnInit } from '@angular/core';;
import { AuthService } from '../utils/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isAuthenticated = false;

  /**
   * Constructor - inject the AuthService class
   */
  constructor(private authService: AuthService) {}

  /**
   * Handle component initialization
   */
  ngOnInit() {

  }

  openCloseNav() {

    document.getElementById('bg').classList.toggle('white');
    document.getElementById('menu').classList.toggle('open');
    document.getElementById('menu-btn').classList.toggle('open');
    
  }

}
