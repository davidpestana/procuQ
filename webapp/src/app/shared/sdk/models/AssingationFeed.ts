/* tslint:disable */

declare var Object: any;
export interface AssingationFeedInterface {
  "turn": any;
  "worker": any;
  "workCenter": any;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class AssingationFeed implements AssingationFeedInterface {
  "turn": any;
  "worker": any;
  "workCenter": any;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: AssingationFeedInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AssingationFeed`.
   */
  public static getModelName() {
    return "AssingationFeed";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AssingationFeed for dynamic purposes.
  **/
  public static factory(data: AssingationFeedInterface): AssingationFeed{
    return new AssingationFeed(data);
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
      name: 'AssingationFeed',
      plural: 'AssingationFeeds',
      path: 'AssingationFeeds',
      idName: 'id',
      properties: {
        "turn": {
          name: 'turn',
          type: 'any'
        },
        "worker": {
          name: 'worker',
          type: 'any'
        },
        "workCenter": {
          name: 'workCenter',
          type: 'any'
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
      }
    }
  }
}
