import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TradeBlotterComponent,
} from './components';
import { TradeService, AppSettingsService } from './services';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

/**
 * Configuration management module
 * @export
 * @class AppConfigModule
 */
@NgModule({
  imports: [
    CommonModule,
    TooltipModule.forRoot()
  ],
  declarations: [TradeBlotterComponent],
  exports: [TradeBlotterComponent],
  providers: [TradeService, AppSettingsService],
  entryComponents: []
})
export class TradeBlotterModule { }
