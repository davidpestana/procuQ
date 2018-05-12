/* tslint:disable */
import {
  Turn,
  WorkCenter,
  WorkerTurnConflict
} from '../index';

declare var Object: any;
export interface WorkerInterface {
  "alias": string;
  "type": string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  turns?: Turn[];
  workCenters?: WorkCenter[];
  workerTurnConflicts?: WorkerTurnConflict[];
}

export class Worker implements WorkerInterface {
  "alias": string;
  "type": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  turns: Turn[];
  workCenters: WorkCenter[];
  workerTurnConflicts: WorkerTurnConflict[];
  constructor(data?: WorkerInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Worker`.
   */
  public static getModelName() {
    return "Worker";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Worker for dynamic purposes.
  **/
  public static factory(data: WorkerInterface): Worker{
    return new Worker(data);
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
      name: 'Worker',
      plural: 'Workers',
      path: 'Workers',
      idName: 'id',
      properties: {
        "alias": {
          name: 'alias',
          type: 'string'
        },
        "type": {
          name: 'type',
          type: 'string'
        },
        "id": {
          name: 'id',
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
        turns: {
          name: 'turns',
          type: 'Turn[]',
          model: 'Turn',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workerId'
        },
        workCenters: {
          name: 'workCenters',
          type: 'WorkCenter[]',
          model: 'WorkCenter',
          relationType: 'hasMany',
          modelThrough: 'WorkerConfig',
          keyThrough: 'workCenterId',
          keyFrom: 'id',
          keyTo: 'workerId'
        },
        workerTurnConflicts: {
          name: 'workerTurnConflicts',
          type: 'WorkerTurnConflict[]',
          model: 'WorkerTurnConflict',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workerId'
        },
      }
    }
  }
}
