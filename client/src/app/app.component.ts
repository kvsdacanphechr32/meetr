import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  public isQABuild: boolean;
  
  title = 'Meetr';

  constructor(private _router: Router, private _active: ActivatedRoute, private _titleSvc: Title) {

    this.isQABuild = environment.qa;
    this._titleSvc.setTitle((this.isQABuild ? '(QA) ' : '') + this.title);
  
  }

  ngOnInit() {

    this._router.events.subscribe((evt) => {

      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      document.body.classList.value = this._active.root.firstChild.snapshot.data['bg'];
  
    });

  }

}