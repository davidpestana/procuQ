/* tslint:disable */
import {
  WorkCenter,
  Worker
} from '../index';

declare var Object: any;
export interface WorkerConfigInterface {
  "relation"?: string;
  "id"?: number;
  "workCenterId"?: number;
  "workerId"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
  workCenter?: WorkCenter;
  worker?: Worker;
}

export class WorkerConfig implements WorkerConfigInterface {
  "relation": string;
  "id": number;
  "workCenterId": number;
  "workerId": number;
  "createdAt": Date;
  "updatedAt": Date;
  workCenter: WorkCenter;
  worker: Worker;
  constructor(data?: WorkerConfigInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `WorkerConfig`.
   */
  public static getModelName() {
    return "WorkerConfig";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of WorkerConfig for dynamic purposes.
  **/
  public static factory(data: WorkerConfigInterface): WorkerConfig{
    return new WorkerConfig(data);
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
      name: 'WorkerConfig',
      plural: 'WorkerConfigs',
      path: 'WorkerConfigs',
      idName: 'id',
      properties: {
        "relation": {
          name: 'relation',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workCenterId": {
          name: 'workCenterId',
          type: 'number'
        },
        "workerId": {
          name: 'workerId',
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
        workCenter: {
          name: 'workCenter',
          type: 'WorkCenter',
          model: 'WorkCenter',
          relationType: 'belongsTo',
                  keyFrom: 'workCenterId',
          keyTo: 'id'
        },
        worker: {
          name: 'worker',
          type: 'Worker',
          model: 'Worker',
          relationType: 'belongsTo',
                  keyFrom: 'workerId',
          keyTo: 'id'
        },
      }
    }
  }
}
