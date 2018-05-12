/* tslint:disable */
import {
  Turn,
  Worker
} from '../index';

declare var Object: any;
export interface WorkCenterInterface {
  "name": string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  turns?: Turn[];
  workers?: Worker[];
}

export class WorkCenter implements WorkCenterInterface {
  "name": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  turns: Turn[];
  workers: Worker[];
  constructor(data?: WorkCenterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkCenter`.
   */
  public static getModelName() {
    return "WorkCenter";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkCenter for dynamic purposes.
  **/
  public static factory(data: WorkCenterInterface): WorkCenter{
    return new WorkCenter(data);
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
      name: 'WorkCenter',
      plural: 'WorkCenters',
      path: 'WorkCenters',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
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
          keyTo: 'workCenterId'
        },
        workers: {
          name: 'workers',
          type: 'Worker[]',
          model: 'Worker',
          relationType: 'hasMany',
          modelThrough: 'WorkerConfig',
          keyThrough: 'workerId',
          keyFrom: 'id',
          keyTo: 'workCenterId'
        },
      }
    }
  }
}
