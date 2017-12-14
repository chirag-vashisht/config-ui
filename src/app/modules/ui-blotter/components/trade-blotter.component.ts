import { Component, OnInit } from '@angular/core';
import { TradeService, AppSettingsService } from '../services';
import { ITrade } from '../interfaces';

/**
 * Component list view
 * @export
 * @class AppConfigComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'trade-blotter',
  templateUrl: './trade-blotter.component.html',
  styleUrls: ['./trade-blotter.component.css'],
})
export class TradeBlotterComponent implements OnInit {

  /**
   * Configurations' list
   * @type {IAppConfig[]}
   * @memberof AppConfigComponent
   */
  public trades: ITrade[];

  /**
   * Error to be shown
   * @type {string}
   * @memberof AppConfigComponent
   */
  public error: string;

  /**
   * Creates an instance of AppConfigComponent.
   * @param {TradeService} tradeService
   * @param {BsModalService} modalService
   * @memberof AppConfigComponent
   */
  constructor(public tradeService: TradeService,
    private appSettings: AppSettingsService) {
    this.tradeService.apiUrl = this.appSettings.apiUrl;
    this.trades = [];
  }

  /**
   * Component init
   * @memberof AppConfigComponent
   */
  public ngOnInit() {
    this.tradeService.getTrades()
      .then((items) => this.trades = items)
      .catch((err) => { this.handleError(err); });
  }

  /**
   * Handler error
   * @param {any} err - error
   * @memberof AppConfigComponent
   */
  public handleError(err) {
    this.error = err.description || err.message;
    setTimeout(this.hideError.bind(this), 5000);
  }

  /**
   * Hides error
   * @memberof AppConfigComponent
   */
  public hideError() {
    this.error = null;
  }

}
