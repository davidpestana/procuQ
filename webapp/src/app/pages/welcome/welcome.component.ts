import { Component, OnInit } from '@angular/core';
import { WorkCenter } from '../../shared/services';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  workCenter:WorkCenter;

  constructor() { }

  ngOnInit() {
  }

  onWorkCenterSelected(workCenter:WorkCenter){
    this.workCenter = workCenter;
  }

}
