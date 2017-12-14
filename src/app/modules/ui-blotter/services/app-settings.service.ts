import { Injectable } from '@angular/core';

/**
 * Service for managing app settings
 * @export
 * @class AppSettingsService
 */
@Injectable()
export class AppSettingsService {

  /**
   * API URL
   * @type {string}
   * @memberof AppSettingsService
   */
  public apiUrl: string;

  /**
   * Creates an instance of AppSettingsService.
   * @memberof AppSettingsService
   */
  constructor() {
    this.apiUrl = 'http://localhost:4000/api';
  }
}
