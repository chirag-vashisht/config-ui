import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TradeBlotterComponent } from './trade-blotter.component';
import { TradeService, AppSettingsService } from '../services';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalMockService, ConfigServiceMockService } from '../mocks';
import { AddConfigComponent } from './add-config.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';
import { ConfirmBoxComponent } from './confirm-box.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { JsonEditorComponent } from 'ng2-jsoneditor';

describe('AppConfigComponent', () => {
  let component: TradeBlotterComponent;
  let fixture: ComponentFixture<TradeBlotterComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddConfigComponent, ConfirmBoxComponent]
      }
    });
    TestBed.configureTestingModule({
      declarations: [TradeBlotterComponent, AddConfigComponent,
        ConfirmBoxComponent, JsonEditorComponent],
      imports: [ModalModule.forRoot(), FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: TradeService, useClass: ConfigServiceMockService },
      { provide: BsModalRef, useClass: BsModalMockService }, AppSettingsService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have error handler', () => {
    component.handleError({ description: 'test' });
    expect(component.error).toEqual('test');
  });
  it('should have generic error handler', () => {
    component.handleError({ message: 'test' });
    expect(component.error).toEqual('test');
  });
  it('should be able to reset error', () => {
    component.hideError();
    expect(component.error).toEqual(null);
  });
});
