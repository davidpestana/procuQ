/* tslint:disable */

declare var Object: any;
export interface EventInterface {
  "start": Date;
  "end": Date;
  "id"?: number;
}

export class Event implements EventInterface {
  "start": Date;
  "end": Date;
  "id": number;
  constructor(data?: EventInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Event`.
   */
  public static getModelName() {
    return "Event";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Event for dynamic purposes.
  **/
  public static factory(data: EventInterface): Event{
    return new Event(data);
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
      name: 'Event',
      plural: 'Events',
      path: 'Events',
      idName: 'id',
      properties: {
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
      },
      relations: {
      }
    }
  }
}
