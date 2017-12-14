import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { ITrade } from '../interfaces';

@Injectable()
export class ConfigServiceMockService {

  public getConfigurationsReturns: Promise<any>;

  constructor() {
    this.getConfigurationsReturns = Promise
      .resolve([{ namespace: 'test1', data: null, description: 'test1' }]);
  }

  public getConfiguration(namespace): Promise<any> {
    if (namespace === 'test') {
      return Promise.resolve({ namespace: 'test', data: {}, description: 'test' });
    } else if (namespace === 'test1') {
      return Promise.resolve({ namespace: 'test1', data: null, description: 'test1' });
    } else {
      return Promise.reject({ description: 'test' });
    }
  }

  public getConfigurations(): Promise<any> {
    return this.getConfigurationsReturns;
  }

  public updateConfiguration(namespace, data) {
    if (namespace === 'test') {
      return Promise.resolve(data);
    } else {
      return Promise.reject({ description: 'test' });
    }
  }

  public addConfiguration(config): Promise<ITrade> {
    const { namespace } = config;
    if (namespace === 'test') {
      return Promise.resolve(config);
    } else {
      return Promise.reject({ description: 'test' });
    }
  }

  public deleteConfiguration(namespace) {
    if (namespace === 'test') {
      return Promise.resolve({ ok: 1 });
    } else {
      return Promise.reject({ description: 'test' });
    }
  }
}
