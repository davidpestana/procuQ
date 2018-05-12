import { Component, OnInit, Input } from '@angular/core';
import { Turn } from '../../shared/sdk';
import * as moment from 'moment';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {
  
  @Input() turn:Turn;

  type:string = "vigilante";
  start:NgbTimeStruct = {hour:null,minute:null,second:null};
  end:NgbTimeStruct = {hour:null,minute:null,second:null};
  hours:NgbTimeStruct = {hour:null,minute:null,second:null};

  constructor(public activeModal: NgbActiveModal) { 

  }

  onChange(){
    this.turn.start.setUTCHours(this.start.hour);
    this.turn.start.setUTCMinutes(this.start.minute);
    this.turn.end.setUTCHours(this.end.hour);
    this.turn.end.setUTCMinutes(this.end.minute);
  }


  setType(type:string){
    this.turn.type = type;
  }

  ngOnInit() {
    let diff = moment(this.turn.start).diff(this.turn.end);
  console.log(diff);
    this.start.hour = this.turn.start.getUTCHours();
    this.start.minute = this.turn.start.getUTCMinutes();
    this.end.hour  = this.turn.end.getUTCHours();
    this.end.minute = this.turn.end.getUTCMinutes();
  }




  // ngOnChange(){
  //   this.start.hour = this.turn.start.getUTCHours();
  //   this.start.minute = this.turn.start.getUTCMinutes();
  //   this.end.hour  = this.turn.end.getUTCHours();
  //   this.end.minute = this.turn.end.getUTCMinutes();
  // }

}
