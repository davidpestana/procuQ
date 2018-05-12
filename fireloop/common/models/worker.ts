import { Model } from '@mean-expert/model';
import * as moment from 'moment';

/**
 * @module Worker
 * @description
 * Write a useful Worker Model description.
 * Register hooks and remote methods within the
 * Model Decorator
 **/
@Model({
  hooks: {
    beforeSave: { name: 'before save', type: 'operation' }
  },
  remotes: {
    myRemote: {
      returns : { arg: 'result', type: 'array' },
      http    : { path: '/my-remote', verb: 'get' }
    }
  }
})

class Worker {
  // LoopBack model instance is injected in constructor
  

  constructor(public model: any) {
    this.model.prototype.model = model;
    this.model.prototype.getTurnsInConflictWithTurn = this.getTurnsInConflictWithTurn;

  }


  // check if turn was between in other turn with 8 ours of margin

  getTurnsInConflictWithTurn(turn:any,next:Function):void{
    let start = moment(turn.start).add(-7 ,'hours').add(-59,'minutes');
    let end   = moment(turn.end).add(7 ,'hours').add(59,'minutes');  
    let where = {
                'and': [ 
                          {id:{'neq':turn.id}}, 
                          {'or':[
                                { start:{between: [start, end]}}, 
                                { end:  {between: [start, end]}}
                          ]}
                       ]
                };
    this.turns.find({where:where}).then((turns:any)=>next(null,turns));
  }

  // Example Operation Hook
  beforeSave(ctx: any, next: Function): void {
    console.log('Worker: Before Save');
    next();
  }
  // Example Remote Method
  myRemote(next: Function): void {
    this.model.find(next);
  }
}

module.exports = Worker;
