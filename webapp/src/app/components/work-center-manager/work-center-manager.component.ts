import { Component, OnInit, Input } from '@angular/core';
import { WorkCenter } from '../../shared/services';

@Component({
  selector: 'app-work-center-manager',
  templateUrl: './work-center-manager.component.html',
  styleUrls: ['./work-center-manager.component.scss']
})
export class WorkCenterManagerComponent implements OnInit {

  @Input('workCenter') workCenter:WorkCenter;

  constructor() { }

  ngOnInit() {
    
  }

}
