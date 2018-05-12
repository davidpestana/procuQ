import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventEditorComponent } from '../event-editor/event-editor.component';
import { EventCreatorComponent } from '../event-creator/event-creator.component';


import { WorkCenterService } from '../../shared/services';
import { Event,Worker,WorkCenter,Turn } from '../../shared/sdk'; 
import * as moment from 'moment';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options,EventObject } from 'fullcalendar';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss']
})
export class ServiceManagerComponent implements OnInit {

  calendarOptions: Options;
  events:EventObject[] = [];
  actions:any[] = [];
  
  @Input() workCenter:WorkCenter;

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private modalService: NgbModal,private workCenterService:WorkCenterService) {}

  ngOnInit(): void {
    
    this.calendarOptions = {
      editable: true,
      defaultView:'agendaWeek',
      eventLimit: false,
      allDaySlot:false,
      slotDuration: moment.duration('00:15:00'),
      slotLabelInterval:moment.duration('01:00:00'),
      displayEventTime:true,
      locale:'es',
      height: 560,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,listMonth'
      },
      events: (start:moment.Moment, end:moment.Moment, timezone:any, callback:Function) => {
        this.workCenterService.getTurns(this.workCenter,start,end)
        .subscribe((turns:Turn[])=>callback(turns.map(this.turnToEvent)));
      }
    };
  }

  turnToEvent(turn:Turn):EventObject{
    return {
      id:turn.id,
      title: turn.worker ? turn.worker.alias : 'turno sin cubrir',
      start: turn.start,
      end: turn.end,
      color: turn.conflicts.length ? 'red' : turn.worker ? 'green' : 'purple',
      textColor: 'white'
    }
  }

  dayClick(event:any){
    console.log('click',event);
    let turn = new Turn();
    turn.start = event.date.toDate();
    turn.end = moment(event.date).add(8, 'hours').toDate();
    turn.type = 'vigilante';

    const modalRef = this.modalService.open(EventCreatorComponent);
    modalRef.result.then((turn:Turn) => this.createTurn(turn));
    modalRef.componentInstance.turn = turn;

 //   this.createEvent(event);
  }

  createTurn(turn:Turn){
    // let turn = new Turn();
    // turn.start = event.date.toDate();
    // turn.end = moment(event.date).add(8, 'hours').toDate();
    this.workCenterService.createTurn(this.workCenter,turn)
      .subscribe((turn:Turn)=>this.ucCalendar.fullCalendar('renderEvent',this.turnToEvent(turn)));
      //this.events = this.ucCalendar.fullCalendar('clientEvents');
  }

  removeEvent(event:any){
    this.workCenterService.removeTurn(event)
    .subscribe(()=>this.ucCalendar.fullCalendar('removeEvents',event._id));
    // // this.actions.push({action:'remove',el:event});
  }

  setWorker(event:any,worker:Worker){
    this.workCenterService.setTurnWorker(event,worker)
    .subscribe((turn:Turn)=>{
      let newEvent = this.turnToEvent(turn);

       event.title = newEvent.title;
       event.color = newEvent.color;

       this.ucCalendar.fullCalendar('updateEvent',event);

    }
  );


    // this.ucCalendar.fullCalendar('updateEvent',event);
    // this.actions.push({action:'setWorker',el:event});
    // console.log(this.actions);
    // this.events = this.ucCalendar.fullCalendar('clientEvents');
  }





  eventResize(event:any){
    console.log('resize',event);
  }
  eventClick(event:any){
    console.log('click',event);
    const modalRef = this.modalService.open(EventEditorComponent);
    modalRef.result.then(
      (result:EventObject) => { this.setWorker(event.event,result.worker) },
      (reason:any)         => { if(reason =='delete') this.removeEvent(event.event) }
    );
    modalRef.componentInstance.event = event.event;
  }
  eventDrop(event:any){
    console.log('drop',event);
  }
  updateEvent(event:any){
    this.workCenterService.updateTurn(event.event).subscribe((turn:Turn)=>{
      let newEvent = this.turnToEvent(turn);
      event.event.title = newEvent.title;
      event.event.color = newEvent.color;
      this.ucCalendar.fullCalendar('updateEvent',event.event);
    }
    );
  }

  clickButton(event:any){
  //  console.log(event);
  }

 


}

