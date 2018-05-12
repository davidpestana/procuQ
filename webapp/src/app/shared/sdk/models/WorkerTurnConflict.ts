/* tslint:disable */
import {
  Worker,
  Turn
} from '../index';

declare var Object: any;
export interface WorkerTurnConflictInterface {
  "type": string;
  "id"?: number;
  "workerId"?: number;
  "turnId"?: number;
  "conflictWithTurnId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  worker?: Worker;
  turn?: Turn;
  conflictWith?: Turn;
}

export class WorkerTurnConflict implements WorkerTurnConflictInterface {
  "type": string;
  "id": number;
  "workerId": number;
  "turnId": number;
  "conflictWithTurnId": number;
  "createdAt": Date;
  "updatedAt": Date;
  worker: Worker;
  turn: Turn;
  conflictWith: Turn;
  constructor(data?: WorkerTurnConflictInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkerTurnConflict`.
   */
  public static getModelName() {
    return "WorkerTurnConflict";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkerTurnConflict for dynamic purposes.
  **/
  public static factory(data: WorkerTurnConflictInterface): WorkerTurnConflict{
    return new WorkerTurnConflict(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'WorkerTurnConflict',
      plural: 'WorkerTurnConflicts',
      path: 'WorkerTurnConflicts',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workerId": {
          name: 'workerId',
          type: 'number'
        },
        "turnId": {
          name: 'turnId',
          type: 'number'
        },
        "conflictWithTurnId": {
          name: 'conflictWithTurnId',
          type: 'number'
        },
        "createdAt": {
          name: 'createdAt',
          type: 'Date'
        },
        "updatedAt": {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'workerId',
          keyTo: 'id'
        },
        turn: {
          name: 'turn',
          type: 'Turn',
          model: 'Turn',
          relationType: 'belongsTo',
                  keyFrom: 'turnId',
          keyTo: 'id'
        },
        conflictWith: {
          name: 'conflictWith',
          type: 'Turn',
          model: 'Turn',
          relationType: 'belongsTo',
                  keyFrom: 'conflictWithTurnId',
          keyTo: 'id'
        },
      }
    }
  }
}
