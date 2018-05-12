/* tslint:disable */
import {
  Worker,
  WorkCenter,
  WorkerTurnConflict
} from '../index';

declare var Object: any;
export interface TurnInterface {
  "type": string;
  "start": Date;
  "end": Date;
  "id"?: number;
  "workerId"?: number;
  "workCenterId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  worker?: Worker;
  workCenter?: WorkCenter;
  conflicts?: WorkerTurnConflict[];
  indirectConflicts?: WorkerTurnConflict[];
}

export class Turn implements TurnInterface {
  "type": string;
  "start": Date;
  "end": Date;
  "id": number;
  "workerId": number;
  "workCenterId": number;
  "createdAt": Date;
  "updatedAt": Date;
  worker: Worker;
  workCenter: WorkCenter;
  conflicts: WorkerTurnConflict[];
  indirectConflicts: WorkerTurnConflict[];
  constructor(data?: TurnInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Turn`.
   */
  public static getModelName() {
    return "Turn";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Turn for dynamic purposes.
  **/
  public static factory(data: TurnInterface): Turn{
    return new Turn(data);
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
      name: 'Turn',
      plural: 'Turns',
      path: 'Turns',
      idName: 'id',
      properties: {
        "type": {
          name: 'type',
          type: 'string'
        },
        "start": {
          name: 'start',
          type: 'Date'
        },
        "end": {
          name: 'end',
          type: 'Date'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workerId": {
          name: 'workerId',
          type: 'number'
        },
        "workCenterId": {
          name: 'workCenterId',
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
        workCenter: {
          name: 'workCenter',
          type: 'WorkCenter',
          model: 'WorkCenter',
          relationType: 'belongsTo',
                  keyFrom: 'workCenterId',
          keyTo: 'id'
        },
        conflicts: {
          name: 'conflicts',
          type: 'WorkerTurnConflict[]',
          model: 'WorkerTurnConflict',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'turnId'
        },
        indirectConflicts: {
          name: 'indirectConflicts',
          type: 'WorkerTurnConflict[]',
          model: 'WorkerTurnConflict',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'conflictWithTurnId'
        },
      }
    }
  }
}
