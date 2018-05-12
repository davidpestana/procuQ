import { Injectable } from '@angular/core';
import { Worker,  FireLoopRef } from '../sdk/models';
import { WorkerApi } from '../sdk/services';
import { RealTime } from '../sdk/services'
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { ISubscription } from "rxjs/Subscription";
import 'rxjs/add/operator/map';

@Injectable()
export class WorkerService {

  workers: BehaviorSubject<Worker[]>;

  constructor(private workerApi:WorkerApi) { 
    this.workers = new BehaviorSubject<Worker[]>([]);
    this.load();
  }

  load():void{
    this.workerApi.find().subscribe((workers:Worker[])=>this.workers.next(workers));
  }

  get():Observable<Worker[]>{
    return this.workers.asObservable();
  }

  create(worker:Worker):Observable<Worker>{
    let result = new Subject<Worker>();
    this.workerApi.create(worker).subscribe((worker:Worker)=>{
      result.next(worker);
      this.load()
    });
    return result;
  }

}

export { Worker } from '../sdk/models';
