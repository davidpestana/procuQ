/* tslint:disable */

declare var Object: any;
export interface TestInterface {
  "name"?: string;
  "id"?: number;
  "createdAt"?: Date;
  "updatedAt"?: Date;
}

export class Test implements TestInterface {
  "name": string;
  "id": number;
  "createdAt": Date;
  "updatedAt": Date;
  constructor(data?: TestInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Test`.
   */
  public static getModelName() {
    return "Test";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Test for dynamic purposes.
  **/
  public static factory(data: TestInterface): Test{
    return new Test(data);
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
      name: 'Test',
      plural: 'Tests',
      path: 'Tests',
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
      }
    }
  }
}
