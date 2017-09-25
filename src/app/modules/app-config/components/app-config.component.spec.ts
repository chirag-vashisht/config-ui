import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppConfigComponent } from './app-config.component';
import { ConfigService, AppSettingsService } from '../services';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalMockService, ConfigServiceMockService } from '../mocks';
import { AddConfigComponent } from './add-config.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { FormsModule } from '@angular/forms';
import { ConfirmBoxComponent } from './confirm-box.component';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { JsonEditorComponent } from 'ng2-jsoneditor';

describe('AppConfigComponent', () => {
  let component: AppConfigComponent;
  let fixture: ComponentFixture<AppConfigComponent>;

  beforeEach(async(() => {
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AddConfigComponent, ConfirmBoxComponent]
      }
    });
    TestBed.configureTestingModule({
      declarations: [AppConfigComponent, AddConfigComponent,
        ConfirmBoxComponent, JsonEditorComponent],
      imports: [ModalModule.forRoot(), FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ConfigService, useClass: ConfigServiceMockService },
      { provide: BsModalRef, useClass: BsModalMockService }, AppSettingsService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle error if there is an error', (done) => {
    component.configService.getConfigurationsReturns =
      Promise.reject({ description: 'test' });
    const spy = spyOn(component, 'handleError');
    component.ngOnInit();
    setTimeout(() => {
      expect(spy).toHaveBeenCalled();
      done();
    }, 0);
  });
  it('Should open modal for adding config', () => {
    component.addConfig();
    expect(component.addModalRef.content.title).toEqual('Add new config');
  });
  it('On sucessful add it should push new data to items', () => {
    const newItem = { namespace: 'test', data: {}, description: 'test' };
    component.onSuccess(newItem);
    expect(component.configurations[0]).toEqual(newItem);
  });
  it('it should allow to view config', () => {
    const item = { namespace: 'test', data: {}, description: 'test' };
    component.viewConfig(item);
    expect(component.addModalRef.content.title).toEqual(item.namespace);
  });
  it('it should allow to edit config', () => {
    const item = { namespace: 'test', data: {}, description: 'test' };
    component.editConfig(item);
    expect(component.addModalRef.content.title)
      .toEqual(`Edit ${item.namespace}`);
  });
  it('it should ask for confirmation before delete', () => {
    const config = { namespace: 'test', data: {}, description: 'test' };
    component.confirmDelete(config, 0);
    expect(component.confirmModalRef.content.title)
      .toEqual(`Delete ${config.namespace}?`);
    expect(component.confirmModalRef.content.message)
      .toEqual(`Are you sure you want to remove ${config.namespace}?`);
    expect(component.confirmModalRef.content.data)
      .toEqual({ config, index: 0 });
  });
  it('should delete item on confirmation', (done) => {
    const config = { namespace: 'test', data: {}, description: 'test' };
    component.configurations.push(config);
    component.delete({ config, index: 0 });
    setTimeout(() => {
      expect(component.configurations.length).toEqual(0);
      done();
    }, 0);
  });
  it('should delete item on confirmation', (done) => {
    const config = { namespace: 'test1', data: {}, description: 'test' };
    const spy = spyOn(component, 'handleError');
    component.configurations.push(config);
    component.delete({ config, index: 0 });
    setTimeout(() => {
      expect(spy).toHaveBeenCalled;
      done();
    }, 0);
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
