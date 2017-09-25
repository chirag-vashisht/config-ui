import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IAppConfig } from '../interfaces';

/**
 * Config service
 * @export
 * @class ConfigService
 */
@Injectable()
export class ConfigService {

  /**
   * Api url to get data from
   * @type {string}
   * @memberof ConfigService
   */
  public apiUrl: string;

  private headers: Headers;

  /**
   * Creates an instance of ConfigService.
   * @param {Http} http
   * @memberof ConfigService
   */
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Gets configurations' list
   * @returns {Promise<IAppConfig[]>}
   * @memberof ConfigService
   */
  public getConfigurations(): Promise<IAppConfig[]> {
    return this.http
      .get(`${this.apiUrl}/configurations`)
      .toPromise()
      .then((response) => response.json() as IAppConfig[])
      .catch(this.handleError);
  }

  /**
   * Adds configuration
   * @param {any} config - config data
   * @returns {Promise<IAppConfig>}
   * @memberof ConfigService
   */
  public addConfiguration(config): Promise<IAppConfig> {
    return this.http
      .post(`${this.apiUrl}/configurations`, config)
      .toPromise()
      .then((response) => response.json() as IAppConfig)
      .catch(this.handleError);
  }

  /**
   * Gets config by namespace
   * @param {any} namespace - namespace
   * @returns {Promise<any>}
   * @memberof ConfigService
   */
  public getConfiguration(namespace): Promise<any> {
    return this.http
      .get(`${this.apiUrl}/configurations/${namespace}`)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Updates configuration data
   * @param {any} namespace - namespace to edit
   * @param {any} data - config data
   * @returns {Promise<JSON>}
   * @memberof ConfigService
   */
  public updateConfiguration(namespace, data) {
    return this.http
      .patch(`${this.apiUrl}/configurations/${namespace}`, { data })
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Deletes config
   * @param {any} namespace - namespace to remove
   * @returns {Promise<JSON>}
   * @memberof ConfigService
   */
  public deleteConfiguration(namespace) {
    return this.http
      .delete(`${this.apiUrl}/configurations/${namespace}`)
      .toPromise()
      .then((response) => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.json());
  }

}
