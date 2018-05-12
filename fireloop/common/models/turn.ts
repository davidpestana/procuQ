import { Model } from '@mean-expert/model';
import { ENGINE_METHOD_ALL } from 'constants';
import { Promise } from 'es6-promise';
import * as moment from 'moment';

const orderPlan:any = {
  'titular' : 100,
  'favorito': 50,
  'vetado'  : 10
}

/**
 * @module Turn
 * @description
 * Write a useful Turn Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    assingWorker: { name: 'after save', type: 'operation' },
    checkConflicts: { name: 'after save', type: 'operation' },
    removeConflicts: { name: 'before delete', type: 'operation' },
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Turn {
  // LoopBack model instance is injected in constructor
  workCenter:any;

  constructor(public model: any) {
   // this.model.prototype.presetStock = this.presetStock;
   this.model.prototype.model = model;
   this.model.prototype.getAvailableWorkers = this.getAvailableWorkers;
  }


  removeConflicts(ctx:any, next:Function):void{
    console.log('Turn: remove conflicts relationed',ctx.where.id);
    this.model.findById(ctx.where.id).then((instance:any)=>{
      instance.conflicts.destroyAll();
      instance.indirectConflicts.destroyAll();
    });
    next();
  }


  checkConflicts(ctx:any, next: Function): void{
  


    ctx.instance.worker.get().then((worker:any)=>{
      if(worker){
        ctx.instance.conflicts.destroyAll().then(()=>{
          worker.getTurnsInConflictWithTurn(ctx.instance,(error:Error,turns:any)=>{
            let promises:any[] = [];
            turns.map((turn:any)=>{
              promises.push(this.model.app.models.WorkerTurnConflict.create({'type':'a',workerId:worker.id,turnId:ctx.instance.id,conflictWithTurnId:turn.id}));
            })
            Promise.all(promises).then(()=>next());
          });
          // TODO ( VETADO CHECK )


        });
      }else  next();
    });
   
  }

  assingWorker(ctx:any, next: Function): void{

    if(ctx.isNewInstance){
      console.log('Turn: assingWorker'); 
      ctx.instance.getAvailableWorkers((error:Error,data:any)=>{
                     let worker = data.workers.reduce((last:any,current:any)=>{ 
                    if(last) return last;  // si ya last no es null, devuelvo last
                    // CHECK CURRENT

                    //is between??   // devuelve false si no coincide con otro turno del worker y true si coincide
                    let isBetween = current.turns().reduce((last:boolean,turn:any)=>{
                        let start = moment(turn.start).add(-8 ,'hours');
                        let end   = moment(turn.end).add(8 ,'hours');
                        if(last) return true;
                        else return ( moment(ctx.instance.start).isBetween(start, end) ||
                                      moment(ctx.instance.end).isBetween(start, end) );
                    },false);

                    if(isBetween) return null;
                    else return current; 
             },null);

             if(worker){
                ctx.instance.workerId = worker.id;
                let p1 = ctx.instance.save();
                let p2 = this.model.app.models.AssingationFeed.create({turn:ctx.instance,worker:worker,workCenter:data.workCenter});
                Promise.all([p1,p2]).then(()=>next());
             }else next();

      });

    }else next();
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Turn: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }



  /* devuelve los workers asignables al turno ordenados por piroridad */
  getAvailableWorkers(next: Function):void {
        Promise.all([
          this.workCenter.get(),
          this.model.app.models.Worker.find({include:'turns'}),
          this.model.app.models.WorkerConfig.find({include:{'worker':'turns'}})
        ]).then((result:any[])=>{ let workCenter = result[0]; let allWorkers = result[1]; let relatedWorkers = result[2]; 
        
            let workers:any = [];
            let bannedIds:any  = [];
            relatedWorkers
                .sort((l:any,c:any)=>orderPlan[c.relation] - orderPlan[l.relation])
                .map((workerConfig:any)=>{ 
                  if(workerConfig.workCenterId == workCenter.id){
                    if(workerConfig.relation == 'vetado') bannedIds.push(workerConfig.worker().id);
                    else workers.push(workerConfig.worker());
                  }else{ 
                    if(workerConfig.relation == 'titular') bannedIds.push(workerConfig.worker().id); // es titular en otro servicio
                  }
                });
            allWorkers.map((worker:any)=>{
               if(bannedIds.indexOf(worker.id)==-1)  //no esta vetado
                 if(workers.reduce((l:boolean,c:any)=>  l ? !(c.id == worker.id) : false ,true))  // true si no esta incluido
                   workers.push(worker);
            })
            next(null,{ workers:workers,bannedIds:bannedIds,workCenter:workCenter });
        });
  }
}

module.exports = Turn;
