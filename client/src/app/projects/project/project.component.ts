import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../utils/data.service';

import * as ismobile from 'ismobilejs';
import * as paper from 'paper';
import * as jsPDF from 'jspdf';
import { CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, AfterViewInit {

  // @Input() data: any;
  public project: any;
  public progress: any[];
  public hasContent: boolean;
  canvasElement: ElementRef;

  public isPhone: boolean;


  @ViewChild('canvasElement', {
    static: false
  }) set content(content: ElementRef) {
    this.canvasElement = content;
    this.drawGrid()
  };

  constructor(private _dataSvc: DataService, private _route: ActivatedRoute) {

    this.isPhone = ismobile.phone;


  }

  ngOnInit() {

    this._dataSvc.userId.subscribe(id => {
      if (id) this.getData(id);
    });
  }

  ngAfterViewInit() {

  }

  getData(userId: string) {

    this._route.params.subscribe(params => {

      this._dataSvc.getDataForUrl('/api/project/get/' + userId + '/' + params['id']).subscribe((response: any) => {

        this.project = response.project;
        this.progress = response.progress;
        this.hasContent = true;

        this._dataSvc.currentProjectId = response.project._id;

      });

    });
  }

  drawGrid() {

    if (!this.canvasElement) return;
    let _paper = new paper.PaperScope();
    _paper.setup(this.canvasElement.nativeElement);
    let p = _paper;

    let canvas = this.canvasElement.nativeElement;
    let widthExt = canvas.style.width.replace('px', ''),
      heightExt = canvas.style.height.replace('px', '');

    let tooltip: paper.PointText;
    let segments: paper.Point[] = [];
    let colors = ['#e9bbb0', '#e85e5d', '#634da0'];

    let bgImg = new Image();
    bgImg.crossOrigin = 'anonymous';
    
    bgImg.onload = () => {
      let bg: paper.Raster = new p.Raster(bgImg);
      bg.position = new p.Point(widthExt/2, heightExt/2);
      bg.sendToBack();
    }
    bgImg.src = 'https://res.cloudinary.com/engagement-lab-home/image/upload/c_scale,f_auto,w_300/v1562355836/engagement-journalism/img/grid.png';

    this.progress.forEach((survey, i) => {

      let xPos = (widthExt / 2) + (survey.sumX * ((widthExt / 2) / 6)),
        yPos = (heightExt / 2) - survey.sumY * ((heightExt / 2) / 6);

      segments.push(new p.Point(xPos, yPos));

      let g: paper.Group = new p.Group();
      let dot = new paper.Path.Circle({
        center: [xPos, yPos],
        radius: 16,
        fillColor: colors[i]
      });
      let txt = new p.PointText({
        point: [xPos - 5, yPos + 5],
        content: i + 1,
        fillColor: 'white',
        fontSize: 16
      });
      g.addChildren([dot, txt]);

      g.onMouseEnter = (event) => {
        // Layout the tooltip above the dot
        tooltip = new p.PointText({
          point: [event.target.position._x - 40, event.target.position._y - 10],
          content: '(' + survey.sumX + ',' + survey.sumY + ')',
          fillColor: 'red',
          fontSize: 10
        });
        // g.scale(1.5);/
      };
      g.onMouseLeave = () => {
        // g.scale(.75);
        tooltip.remove();
      };

    });

    // Draw line(s)
    let path = new p.Path(segments);
    path.strokeColor = new p.Color('black');
    path.strokeCap = 'round';
    path.strokeWidth = 1.5;
    path.dashArray = [1, 4];
    path.sendToBack();
  }

  exportPdf() {
    let canvasImg = this.canvasElement.nativeElement.toDataURL();
    let doc = new jsPDF();
    doc.addImage(canvasImg, 'PNG', 0, 0);
    doc.save('a4.pdf')
  }

}
