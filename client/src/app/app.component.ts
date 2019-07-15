import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Meetr';

  constructor(private _router: Router, private _active: ActivatedRoute) {}

  ngOnInit() {

    this._router.events.subscribe((evt) => {

      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.classList.value = this._active.root.firstChild.snapshot.data['bg'];
  
    });

  }

}