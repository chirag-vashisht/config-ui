import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ITrade } from '../interfaces';

/**
 * Config service
 * @export
 * @class ConfigService
 */
@Injectable()
export class TradeService {

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
   * @returns {Promise<ITrade[]>}
   * @memberof ConfigService
   */
  public getTrades(): Promise<ITrade[]> {
    return this.http
      .get(`${this.apiUrl}/trades`)
      .toPromise()
      .then((response) => response.json() as ITrade[])
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.json());
  }

}
