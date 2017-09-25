import { Component, OnInit, ViewChild } from '@angular/core';
import { IAppConfig } from '../interfaces';
import { JsonEditorComponent, JsonEditorOptions } from 'ng2-jsoneditor';
import { ConfigService } from '../services';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

/**
 * Add configuration component
 * @export
 * @class AddConfigComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'add-config',
  templateUrl: './add-config.component.html',
  styleUrls: ['./add-config.component.css']
})
export class AddConfigComponent implements OnInit {

  /**
   * Child compoent for editing json
   * @type {JsonEditorComponent}
   * @memberof AddConfigComponent
   */
  @ViewChild(JsonEditorComponent) public editor: JsonEditorComponent;

  /**
   * Json editor option
   * @type {JsonEditorOptions}
   * @memberof AddConfigComponent
   */
  public editorOptions: JsonEditorOptions;

  /**
   * Title of the modal
   * @type {string}
   * @memberof AddConfigComponent
   */
  public title: string;

  /**
   * Event handler to execute after addition
   * @type {Function}
   * @memberof AddConfigComponent
   */
  public onSuccess: Function;

  /**
   * Event handler to execute after eroo
   * @type {Function}
   * @memberof AddConfigComponent
   */
  public onError: Function;

  /**
   * Edit level can be
   * 1:view, 2:edit, 3:addnew
   * @type {number}
   * @memberof AddConfigComponent
   */
  public editLevel: number;

  /**
   * Config model to edit
   * @type {IAppConfig}
   * @memberof AddConfigComponent
   */
  public appConfig: IAppConfig;

  /**
   * Error to be shown
   * @type {string}
   * @memberof AddConfigComponent
   */
  public error: string;

  /**
   * Creates an instance of AddConfigComponent.
   * @param {ConfigService} configService
   * @param {BsModalRef} bsModalRef
   * @memberof AddConfigComponent
   */
  constructor(private configService: ConfigService, public bsModalRef: BsModalRef) {
    this.editorOptions = new JsonEditorOptions();
    this.editLevel = 3;
  }

  /**
   * NgInit
   * @memberof AddConfigComponent
   */
  public ngOnInit() {
    this.appConfig = {
      data: {},
      description: null,
      namespace: null
    };
  }

  /**
   * Sets mode to edit
   * @param {IAppConfig} config
   * @memberof AddConfigComponent
   */
  public setEditMode(config: IAppConfig) {
    this.editLevel = 2;
    this.editor.setMode('tree');
    this.appConfig = config;
    this.configService.getConfiguration(config.namespace).then((result) => {
      if (result.data) {
        this.editor.set(result.data);
      }
    }).catch((err) => {
      this.error = err.description;
    });
  }

  /**
   * Sets edit mode to view
   * @param {IAppConfig} config
   * @memberof AddConfigComponent
   */
  public setViewMode(config: IAppConfig) {
    this.editLevel = 1;
    this.editor.setMode('view');
    this.appConfig = config;
    this.configService.getConfiguration(config.namespace).then((result) => {
      if (result.data) {
        this.editor.set(result.data);
      }
    }).catch((err) => {
      this.error = err.description;
    });
  }

  /**
   * Submits the form
   * @memberof AddConfigComponent
   */
  public submit() {
    this.error = null;
    this.appConfig.data = this.editor.get();
    if (this.editLevel === 2) {
      this.update();
    } else {
      this.save();
    }
  }

  private update() {
    this.configService.
      updateConfiguration(this.appConfig.namespace, this.editor.get())
      .then((data) => {
        this.bsModalRef.hide();
      }).catch((err) => {
        this.handleError(err);
      });
  }

  private handleError(err) {
    if (this.onError) {
      this.onError(err);
    }
    this.error = err.description;
  }

  private save() {
    this.configService.addConfiguration(this.appConfig).then((data) => {
      if (this.onSuccess) {
        this.onSuccess(data);
      }
      this.bsModalRef.hide();
    }).catch((err) => {
      this.handleError(err);
    });
  }

}
