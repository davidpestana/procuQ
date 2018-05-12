import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workers-page',
  templateUrl: './workers-page.component.html',
  styleUrls: ['./workers-page.component.scss']
})
export class WorkersPageComponent implements OnInit {

  worker:Worker;

  constructor() { }

  ngOnInit() {
  }

  onWorkerSelected(worker:Worker){
    this.worker = worker;
  }
}
