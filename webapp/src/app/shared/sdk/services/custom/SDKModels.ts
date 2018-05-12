/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { WorkCenter } from '../../models/WorkCenter';
import { Worker } from '../../models/Worker';
import { Event } from '../../models/Event';
import { Turn } from '../../models/Turn';
import { WorkerConfig } from '../../models/WorkerConfig';
import { AssingationFeed } from '../../models/AssingationFeed';
import { WorkerTurnConflict } from '../../models/WorkerTurnConflict';
import { Test } from '../../models/Test';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    WorkCenter: WorkCenter,
    Worker: Worker,
    Event: Event,
    Turn: Turn,
    WorkerConfig: WorkerConfig,
    AssingationFeed: AssingationFeed,
    WorkerTurnConflict: WorkerTurnConflict,
    Test: Test,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
