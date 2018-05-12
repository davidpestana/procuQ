import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable,BehaviorSubject, Subject } from 'rxjs';
import { Turn,WorkCenter } from '../sdk';
import { WorkCenterService } from '../services/work-center.service';

type AOA = any[][];
type Range = {start:number[],end:number[]};

const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];



@Injectable()
export class LidlFilesService {

  constructor(private workCenterService:WorkCenterService) { }

  events:BehaviorSubject<Turn[]> = new BehaviorSubject<Turn[]>([]);

  onLoad = (e: any) => {
    /* read workbook */
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
    let events = this.captureEvents(wb);
    this.events.next(events);
  };

  getEvents(){
    return this.events.asObservable();
  }

  captureEvents(wb:XLSX.WorkBook){
    let sheet:XLSX.WorkSheet = wb.Sheets['C5'];
    let month:string = sheet.J1.v.toLowerCase();
    let year:number  = sheet.K1.v;
     
    let workCenters = this.getWorkCenters(sheet);
    let turns:Turn[] = [];

    for(let line = 5; line < 85; line++){
      let day:any = sheet['B'+line];
      let weekDay = sheet['C'+line];

      if(day && weekDay){ 
        line ++;
        if(day.v){
            let data = this.getLine(sheet,line,3,workCenters.length);
       //     console.log(day.v,weekDay.v,data);
            data.map((c:any,i:any)=>{
              let workCenter = workCenters[i];


              if(new RegExp(/([0-9]{2}:[0-9]{2})+/g).test(c)){

                    turns = c.match(/([0-9]{2}:[0-9]{2})+/g)
                    .reduce((last:Range[],current:any,index:number,array:any[])=>{
                          if(index%2==0) last.push({start:array[index].split(':'),end:array[index+1].split(':')});
                          return last; 
                    },[])                
                    .reduce((last:Turn[],current:Range)=>
                        {    
                          let turn = new Turn();
                          let wc = new WorkCenter();
                          wc.name = workCenter;
                          turn.start = new Date(year, months.indexOf(month), day.v, current.start[0], current.start[1]);
                          turn.end = new Date(year, months.indexOf(month), day.v, current.end[0], current.end[1]);
                          turn.type = 'vigilante';
                          turn.workCenter = wc;
                          last.push(turn);
                          return last;
                        }
                    ,turns)
                  }
              
            })
        }
      }
     
    }


    return (turns);

  }

 

  getWorkCenters(sheet:XLSX.WorkSheet){

    let line1 = this.getLine(sheet,3);
    let line2 = this.getLine(sheet,4);
    return line1.map((v:any,index:number)=>{
      return  '(' + v + ') ' + line2[index] + ' #LIDL' ;
    });
  }

  getLine(sheet:XLSX.WorkSheet,id:number,columnStart:number = 3,quantity:number=null):Array<any>{
    let index = columnStart;
    let result:any[] = [];
    let exit:boolean = false;
      do{
        let columnCode = this.getColumCode(index);
        let cell = columnCode + id;
        let value = sheet[cell];

        if(quantity){
          if(result.length <= quantity){ result.push(value?value.v:'')} else { exit = true }
        }else{
          if(value) {result.push(value.v); } else { exit = true }
        }
        index ++;
      }while(!exit);
    return result;
  }

  getColumCode(index:number):string{   
    let values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result:string;
    if(index>values.length){
      let mayor =  Math.floor(index / values.length);
      let minor =  index % values.length;
      console.log(mayor,minor)
      result = values[mayor] + values[minor];
    }else{
      result = values[index];
    }
    return result;
  }



  import(turns:Turn[]):Observable<Turn[]>{
    let response:Subject<Turn[]> = new Subject<Turn[]>();
    let result:Turn[] = [];
    turns.map((turn:Turn)=>{
        this.workCenterService.create(turn.workCenter)
        .subscribe((workCenter:WorkCenter)=>{
            this.workCenterService.createTurn(workCenter,turn)
            .subscribe((turn:Turn)=>{
              result.push(turn);
              response.next(result);
            });
        });
    });
    return response.asObservable();
  }
}
