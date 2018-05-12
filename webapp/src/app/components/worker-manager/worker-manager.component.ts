import { Component, OnInit, Input } from '@angular/core';
import { Worker,WorkerConfig } from '../../shared/sdk'; 
import { WorkCenterService,WorkCenter } from '../../shared/services';


@Component({
  selector: 'app-worker-manager',
  templateUrl: './worker-manager.component.html',
  styleUrls: ['./worker-manager.component.scss']
})
export class WorkerManagerComponent implements OnInit {

  @Input() workCenter:WorkCenter;

  workerConfigs:WorkerConfig[] = [];



  constructor(private workCenterService:WorkCenterService) { }

  ngOnInit() {
    this.load();
  }


  load(){
    this.workCenterService.getWorkers(this.workCenter).subscribe((workerConfigs:WorkerConfig[])=>this.workerConfigs = workerConfigs);

  }

  updateRelation(workerConfig:WorkerConfig,relation:string){
    this.workCenterService.updateWorkerRelation(workerConfig,relation).subscribe(()=>this.load());
  }

  addConfig(worker:Worker){
    this.workCenterService.createWorkerConfig(this.workCenter,worker).subscribe(()=>this.load());
    // this.workerConfigs.push({worker:worker,relation:'titular'});
  }

  removeWorker(worker:Worker){
    this.workCenterService.removeWorkerConfig(this.workCenter,worker).subscribe(()=>this.load());
  }
}
