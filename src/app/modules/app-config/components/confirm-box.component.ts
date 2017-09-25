import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

/**
 * Confirmation dialogue
 * @export
 * @class ConfirmBoxComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css']
})
export class ConfirmBoxComponent implements OnInit {

  /**
   * Title of modal
   * @type {string}
   * @memberof ConfirmBoxComponent
   */
  public title: string;

  /**
   * Message to be shown in modal
   * @type {string}
   * @memberof ConfirmBoxComponent
   */
  public message: string;

  /**
   * Event handler to be executed after confirm
   * @type {Function}
   * @memberof ConfirmBoxComponent
   */
  public onConfirmed: Function;

  /**
   * Data to be preserved for event handler
   * @type {*}
   * @memberof ConfirmBoxComponent
   */
  public data: any;

  /**
   * Creates an instance of ConfirmBoxComponent.
   * @param {BsModalRef} bsModalRef
   * @memberof ConfirmBoxComponent
   */
  constructor(public bsModalRef: BsModalRef) {
    this.title = 'Title';
  }

  /**
   * Modal init
   * @memberof ConfirmBoxComponent
   */
  public ngOnInit() {
    this.message = 'Your content goes here!';
  }

  /**
   * Gives confirmation of action
   * @memberof ConfirmBoxComponent
   */
  public confirmed() {
    if (this.onConfirmed) {
      this.onConfirmed(this.data);
    }
    this.bsModalRef.hide();
  }

}
