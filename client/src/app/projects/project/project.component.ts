import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
;
import { DataService } from '../../utils/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  // @Input() data: any;
  public data: any;
  public hasContent: boolean;

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {

    this._dataSvc.userId.subscribe(id => {
      if(id) this.getData(id);
    });
  }

  getData(userId: string) {

    this._route.params.subscribe(params => {

      this._dataSvc.getDataForUrl('/api/project/get/' + userId + '/' + params['id']).subscribe((response: any) => {
          
        this.data = response;
        this.hasContent = true;

        this._dataSvc.currentProjectId = response._id;

      });

    });
  }

}
