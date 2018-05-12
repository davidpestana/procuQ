import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WorkCenterService,WorkCenter } from '../../shared/services';
import { ISubscription } from 'rxjs/Subscription';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';



@Component({
  selector: 'app-work-center-selector',
  templateUrl: './work-center-selector.component.html',
  styleUrls: ['./work-center-selector.component.scss']
})
export class WorkCenterSelectorComponent implements OnInit {
  

  @Output() onSelect: EventEmitter<WorkCenter> = new EventEmitter<WorkCenter>();

  subscription:ISubscription;
  workCenters:WorkCenter[];
  workCenter:WorkCenter;
  public createString:string = null;


  constructor(private workCenterService:WorkCenterService) { }

  ngOnInit() {
    this.subscription = this.workCenterService.get().subscribe((workcenters:WorkCenter[])=>this.workCenters = workcenters);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formatter(workCenter: {name: string}){
    return workCenter.name;
  };
  
  search(text$: Observable<string>){
    return text$
       .debounceTime(200)
       .distinctUntilChanged()
       .map(term=>{
         let result = this.workCenters
          .filter(workCenter => workCenter.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0,10);

          if(!result.length) this.createString = term;
          else this.createString = null;
          return result;
        });
  }

  set(workCenter:WorkCenter){
    this.onSelect.emit(workCenter);
    this.workCenter = workCenter;
  }

  selected(workCenter:WorkCenter){
    this.set(workCenter);
    //this.router.navigate(['config']);
  }

   create(){
      let newWorkCenter = new WorkCenter();
      newWorkCenter.name = this.createString;
      this.createString = null;
      this.workCenterService.create(newWorkCenter).subscribe((workCenter:WorkCenter)=>this.set(workCenter));
   }
}
