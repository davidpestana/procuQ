import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { EventEditorComponent } from '../event-editor/event-editor.component';

import * as moment from 'moment';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options,EventObject } from 'fullcalendar';

@Component({
  selector: 'app-recurrent-week-config',
  templateUrl: './recurrent-week-config.component.html',
  styleUrls: ['./recurrent-week-config.component.scss']
})
export class RecurrentWeekConfigComponent implements OnInit {


  calendarOptions: Options;
  events:EventObject[] = [];

  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private modalService: NgbModal) {}

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
      listDayFormat:false,
      header: {
        left: '',
        center: '',
        right: ''
      },
      events: (start:any, end:any, timezone:any, callback:Function) => {
        //console.log(start,end,timezone,callback);
        callback(this.events);
        console.log(this.events);
      }
    };
  }

  dayClick(event:any){
    console.log(event);
    
    let el = {
      title: 'sin titular',
      start: event.date,
      end:  moment(event.date).add(8, 'hours'),
      //rendering: 'background',
      color: 'orange',
      textColor: 'white'
    }
   // this.events.push(el);

  //   let el = {
  //     title:"My repeating event",
  //     start: '10:00', // a start time (10am in this example)
  //     end: '14:00', // an end time (2pm in this example)
  //     dow: [ 1, 4 ] // Repeat monday and thursday
  // }

    this.ucCalendar.fullCalendar('renderEvent', el);
    this.ucCalendar.fullCalendar('rerenderEvents');
    this.events = this.ucCalendar.fullCalendar('clientEvents');
  }

  eventResize(event:any){
    console.log('resize',event);
  }
  eventClick(event:any){
    console.log('click',event);
    const modalRef = this.modalService.open(EventEditorComponent);
    modalRef.result.then((result:EventObject)=>{
      event.event.title = result.worker.alias;
      event.event.color = 'green';
      this.ucCalendar.fullCalendar('updateEvent',event.event);
      this.events = this.ucCalendar.fullCalendar('clientEvents');
    },(reason)=>{
      if(reason =='delete') this.ucCalendar.fullCalendar('removeEvents',event.event._id);
      this.events = this.ucCalendar.fullCalendar('clientEvents');
    });
    modalRef.componentInstance.event = event.event;
  }
  eventDrop(event:any){
    console.log('drop',event);
  }
  updateEvent(event:any){
    console.log('update',event);
    this.events = this.ucCalendar.fullCalendar('clientEvents');

  }

  clickButton(event:any){
    console.log(event);
  }

 

}
