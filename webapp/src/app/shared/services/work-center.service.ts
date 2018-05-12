import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { WorkCenter,Turn,Worker,WorkerConfig, FireLoopRef } from '../sdk/models';
import { WorkCenterApi,TurnApi,WorkerConfigApi } from '../sdk/services';
import { RealTime } from '../sdk/services'
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';

@Injectable()
export class WorkCenterService {

  workCenters: BehaviorSubject<WorkCenter[]>;

  constructor(private workCenterApi:WorkCenterApi, private turnApi:TurnApi,private workerConfigApi:WorkerConfigApi) { 
    this.workCenters = new BehaviorSubject<WorkCenter[]>([]);
    this.load();
  }

  load():void{
    this.workCenterApi.find({'include':['turns','workers']}).subscribe((workCenters:WorkCenter[])=>this.workCenters.next(workCenters));
  }

  get():Observable<WorkCenter[]>{
    return this.workCenters.asObservable();
  }

  create(workCenter:WorkCenter):Observable<WorkCenter>{
    let result = new Subject<WorkCenter>();
    this.workCenterApi.upsertWithWhere(workCenter,workCenter)
    //this.workCenterApi.create(workCenter)
    .subscribe((workCenter:WorkCenter)=>{
      result.next(workCenter);
      this.load()
    });
    return result;
  }

// WORKERS
  getWorkers(workCenter:WorkCenter){
    return this.workerConfigApi.find({include:'worker',where:{workCenterId:workCenter.id}});
  }

  createWorkerConfig(workCenter:WorkCenter,worker:Worker){
    let result = new Subject<any>();
    this.workCenterApi.linkWorkers(workCenter.id,worker.id,{relation:'titular'})
    //this.workCenterApi.createWorkers(workCenter.id,worker)
    .subscribe((data:any)=>result.next(data));
    return result.asObservable();
  }

  updateWorkerRelation(workerConfig:WorkerConfig,relation:string){
   return this.workerConfigApi.patchAttributes(workerConfig.id,{relation:relation});
  }

  removeWorkerConfig(workCenter:WorkCenter,worker:Worker){
    let result = new Subject<any>();
    this.workCenterApi.unlinkWorkers(workCenter.id,worker.id)
    .subscribe((data:any)=>result.next(data));
    return result.asObservable();
  }

//TURNS

  getTurns(workCenter:WorkCenter,start:moment.Moment,end:moment.Moment){
   return this.workCenterApi.getTurns(workCenter.id,{
      include:['worker','conflicts','indirectConflicts'],
      where: {
        start: {
          between:[start.toDate(), end.toDate()]
        }
        }
    })
  }

  createTurn(workCenter:WorkCenter,turn:Turn):Observable<Turn>{
    let result = new Subject<Turn>();
    this.workCenterApi.createTurns(workCenter.id,turn).subscribe((turn:Turn)=>
      this.turnApi.findById(turn.id,{include:['worker','conflicts','indirectConflicts']})
      .subscribe((turn:Turn)=>result.next(turn))
    );
    return result.asObservable();
  }


  updateTurn(turn:any){
    let result = new Subject<Turn>();
    this.turnApi.patchAttributes(turn.id,{start:turn.start.toDate(),end:turn.end.toDate()})
    .subscribe((turn:Turn)=>
      this.turnApi.findById(turn.id,{include:['worker','conflicts','indirectConflicts']})
      .subscribe((turn:Turn)=>result.next(turn))
    );
    return result.asObservable();
  }

  setTurnWorker(turn:Turn,worker:Worker){
    let result = new Subject<Turn>();
    this.turnApi.patchAttributes(turn.id,{'workerId':worker.id})
    .subscribe((turn:Turn)=>    
      this.turnApi.findById(turn.id,{include:['worker','conflicts','indirectConflicts']})
      .subscribe((turn:Turn)=>result.next(turn))  
    );
    return result.asObservable();
  }


  removeTurn(turn:Turn){
    let result = new Subject<Turn>();
    this.turnApi.deleteById(turn.id)
    .subscribe((turn:Turn)=>result.next(turn));
    return result;
  }
}

export { WorkCenter } from '../sdk/models';
