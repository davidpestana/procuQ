import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkerTurnConflict as Alert, FireLoopRef, RealTime } from '../sdk';

@Injectable()
export class AlertsService {

  private reference:FireLoopRef<Alert>;
  
  alerts:BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  
  constructor(private realTime: RealTime) {

    this.realTime
        .onReady()
        .subscribe(() =>{
          this.reference = this.realTime.FireLoop.ref<Alert>(Alert);
          this.reference
              .on('change',{'include':['worker',{'turn':'workCenter'},{'conflictWith':'workCenter'}]})
              .subscribe((alerts: Array<Alert>) => this.alerts.next(alerts));
        });
  }
  
  dispose(){
    this.reference.dispose();
  }

  get(){
    return this.alerts.asObservable();
  }


}

export {WorkerTurnConflict as Alert} from '../sdk' 