import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AppConfigComponent,
  AddConfigComponent,
  ConfirmBoxComponent
} from './components';
import { ConfigService, AppSettingsService } from './services';
import { FormsModule } from '@angular/forms';
import { JSONEditorModule } from 'ng2-jsoneditor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Configuration management module
 * @export
 * @class AppConfigModule
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JSONEditorModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [AppConfigComponent, AddConfigComponent, ConfirmBoxComponent],
  exports: [AppConfigComponent, AddConfigComponent, ConfirmBoxComponent],
  providers: [ConfigService, AppSettingsService],
  entryComponents: [AddConfigComponent, ConfirmBoxComponent]
})
export class AppConfigModule { }
