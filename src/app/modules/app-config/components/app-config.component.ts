import { Component, OnInit } from '@angular/core';
import { ConfigService, AppSettingsService } from '../services';
import { IAppConfig } from '../interfaces';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { AddConfigComponent } from './add-config.component';
import { ConfirmBoxComponent } from './confirm-box.component';

/**
 * Component list view
 * @export
 * @class AppConfigComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css'],
})
export class AppConfigComponent implements OnInit {

  /**
   * Configurations' list
   * @type {IAppConfig[]}
   * @memberof AppConfigComponent
   */
  public configurations: IAppConfig[];

  /**
   * Add Modal Reference
   * @type {BsModalRef}
   * @memberof AppConfigComponent
   */
  public addModalRef: BsModalRef;

  /**
   * Confirm modal reference
   * @type {BsModalRef}
   * @memberof AppConfigComponent
   */
  public confirmModalRef: BsModalRef;

  /**
   * Error to be shown
   * @type {string}
   * @memberof AppConfigComponent
   */
  public error: string;

  /**
   * Creates an instance of AppConfigComponent.
   * @param {ConfigService} configService
   * @param {BsModalService} modalService
   * @memberof AppConfigComponent
   */
  constructor(public configService: ConfigService, private modalService: BsModalService,
              private appSettins: AppSettingsService) {
    this.configService.apiUrl = this.appSettins.apiUrl;
    this.configurations = [];
  }

  /**
   * Component init
   * @memberof AppConfigComponent
   */
  public ngOnInit() {
    this.configService.getConfigurations()
      .then((items) => this.configurations = items)
      .catch((err) => { this.handleError(err); });
  }

  /**
   * Opens up modal for adding config
   * @memberof AppConfigComponent
   */
  public addConfig() {
    this.addModalRef = this.modalService.show(AddConfigComponent);
    this.addModalRef.content.title = 'Add new config';
    this.addModalRef.content.onSuccess = this.onSuccess.bind(this);
  }

  /**
   * Success event handler after addition of
   * Config
   * @param {any} data
   * @memberof AppConfigComponent
   */
  public onSuccess(data) {
    this.configurations.unshift(data);
  }

  /**
   * Opens up modal for viewing config
   * @param {IAppConfig} config
   * @memberof AppConfigComponent
   */
  public viewConfig(config: IAppConfig) {
    this.addModalRef = this.modalService.show(AddConfigComponent);
    this.addModalRef.content.title = config.namespace;
    this.addModalRef.content.setViewMode(config);
  }

  /**
   * Opens up modal for editing config
   * @param {IAppConfig} config
   * @memberof AppConfigComponent
   */
  public editConfig(config: IAppConfig) {
    this.addModalRef = this.modalService.show(AddConfigComponent);
    this.addModalRef.content.title = `Edit ${config.namespace}`;
    this.addModalRef.content.setEditMode(config);
  }

  /**
   * Opens confimation for deletion of config
   * @param {IAppConfig} config
   * @param {any} index
   * @memberof AppConfigComponent
   */
  public confirmDelete(config: IAppConfig, index) {
    this.confirmModalRef = this.modalService.show(ConfirmBoxComponent);
    this.confirmModalRef.content.title = `Delete ${config.namespace}?`;
    this.confirmModalRef.content.message = `Are you sure you want to remove ${config.namespace}?`;
    this.confirmModalRef.content.data = { config, index };
    this.confirmModalRef.content.onConfirmed = this.delete.bind(this);
  }

  /**
   * Deletes the config after confirmation
   * @param {any} data
   * @memberof AppConfigComponent
   */
  public delete(data) {
    this.configService
      .deleteConfiguration(data.config.namespace).then(() => {
        this.configurations.splice(data.index, 1);
      }).catch((err) => {
        this.handleError(err);
      });
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
