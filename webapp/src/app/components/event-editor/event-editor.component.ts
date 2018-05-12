import { Component, OnInit,Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventObject } from 'fullcalendar';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  @Input() event:EventObject = null;


  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    //console.log(this.event.start);

  }

  workerSelected(worker:Worker){
    this.event.worker = worker;
    this.activeModal.close(this.event);
  }

}
