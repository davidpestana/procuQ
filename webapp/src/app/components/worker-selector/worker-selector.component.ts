import { Component, OnInit, Output,Input, EventEmitter, ElementRef } from '@angular/core';
import { WorkerService,Worker } from '../../shared/services';
import { ISubscription } from 'rxjs/Subscription';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-worker-selector',
  templateUrl: './worker-selector.component.html',
  styleUrls: ['./worker-selector.component.scss']
})
export class WorkerSelectorComponent implements OnInit {
  @Input() placeholder:String = "busca o crea un alias de trabajador";
  @Input() type:string = 'vigilante';

  @Output() onSelect: EventEmitter<Worker> = new EventEmitter<Worker>();
  subscription:ISubscription;
  workers:Worker[];
  worker:Worker;

  public createString:string = null;

  constructor(private workerService:WorkerService) { }
  ngOnInit() {
    this.subscription = this.workerService.get().subscribe((workcenters:Worker[])=>this.workers = workcenters);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formatter(worker: {alias: string}){
    return worker.alias;
  };
  
  search(text$: Observable<string>){
    return text$
       .debounceTime(200)
       .distinctUntilChanged()
       .map(term=>{
         let result = this.workers
          .filter(worker => worker.type == this.type)
          .filter(worker => worker.alias.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0,10);

          if(!result.length) this.createString = term;
          else this.createString = null;
          return result;
        });
  }

  set(worker:Worker){
    this.onSelect.emit(worker);
    this.worker = worker;
  }

  selected(worker:Worker){
    this.set(worker);
    //this.router.navigate(['config']);
  }

  setType(type:string){
    this.type = type;
    this.createString = "";
  }

  create(){
      let newWorker = new Worker();
      newWorker.alias = this.createString;
      newWorker.type = this.type;
      this.createString = null;
      this.workerService.create(newWorker).subscribe((worker:Worker)=>this.set(worker));
   }

}
