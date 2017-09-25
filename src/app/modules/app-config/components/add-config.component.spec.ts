import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddConfigComponent } from './add-config.component';
import { JsonEditorComponent } from 'ng2-jsoneditor';
import { ConfigService } from '../services';
import { JSONEditorModule } from 'ng2-jsoneditor';
import { FormsModule } from '@angular/forms';
import { MockBackend } from '@angular/http/testing';
import {
  HttpModule, Http, BaseRequestOptions,
  XHRBackend, ConnectionBackend, RequestOptions
} from '@angular/http';
import { BsModalMockService, ConfigServiceMockService } from '../mocks';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

describe('AddConfigComponent', () => {
  let component: AddConfigComponent;
  let fixture: ComponentFixture<AddConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddConfigComponent, JsonEditorComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: ConfigService, useClass: ConfigServiceMockService },
      { provide: BsModalRef, useClass: BsModalMockService }],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('edit mode', () => {
    it('should set edit mode', () => {
      const config = { namespace: 'test', data: {}, description: 'test' };
      component.setEditMode(config);
      expect(component.editLevel).toEqual(2);
      expect(component.editor.getMode()).toEqual('tree');
      expect(component.appConfig).toEqual(config);
      expect(component.editor.get()).toEqual({});
    });
    it('should set edit mode even if config data is null', () => {
      const config = { namespace: 'test1', data: {}, description: 'test1' };
      component.setEditMode(config);
      expect(component.editLevel).toEqual(2);
      expect(component.editor.getMode()).toEqual('tree');
      expect(component.appConfig).toEqual(config);
      expect(component.editor.get()).toEqual({});
    });
    it('should handle error if there is error returned by backend', (done) => {
      const config = { namespace: 'test2', data: {}, description: 'test1' };
      component.setEditMode(config);
      expect(component.editLevel).toEqual(2);
      expect(component.editor.getMode()).toEqual('tree');
      expect(component.appConfig).toEqual(config);
      setTimeout(() => {
        expect(component.error).toEqual('test');
        done();
      }, 0);
    });
  });
  describe('view mode', () => {
    it('should view mode', () => {
      const config = { namespace: 'test', data: {}, description: 'test' };
      component.setViewMode(config);
      fixture.detectChanges();
      expect(component.editLevel).toEqual(1);
      expect(component.editor.getMode()).toEqual('view');
      expect(component.appConfig).toEqual(config);
      expect(component.editor.get()).toEqual({});
    });
    it('should set view mode even if config data is null', () => {
      const config = { namespace: 'test1', data: {}, description: 'test1' };
      component.setViewMode(config);
      fixture.detectChanges();
      expect(component.editLevel).toEqual(1);
      expect(component.editor.getMode()).toEqual('view');
      expect(component.appConfig).toEqual(config);
      expect(component.editor.get()).toEqual({});
    });
    it('should handle error if there is error returned by backend', (done) => {
      const config = { namespace: 'test2', data: {}, description: 'test1' };
      component.setViewMode(config);
      expect(component.editLevel).toEqual(1);
      expect(component.editor.getMode()).toEqual('view');
      expect(component.appConfig).toEqual(config);
      setTimeout(() => {
        expect(component.error).toEqual('test');
        done();
      }, 0);
    });
  });
  describe('submit', () => {
    it('Should submit the form to save data', (done) => {
      component.appConfig = { namespace: 'test', data: {}, description: 'test' };
      component.editLevel = 3;
      component.onSuccess = () => { console.log('Called!'); };
      const spy = spyOn(component, 'onSuccess');
      component.submit();
      expect(component.error).toEqual(null);
      setTimeout(() => {
        expect(spy).toHaveBeenCalledWith(component.appConfig);
        done();
      }, 0);
    });
    it(`Should submit the form to save data 
    success method if not provided`, (done) => {
        component.appConfig = { namespace: 'test', data: {}, description: 'test' };
        component.editLevel = 3;
        component.submit();
        expect(component.error).toEqual(null);
        done();
      });
    it('Should handle http errors', (done) => {
      component.appConfig = { namespace: 'test1', data: {}, description: 'test' };
      component.editLevel = 3;
      component.submit();
      setTimeout(() => {
        expect(component.error).toEqual('test');
        done();
      }, 0);
    });
    it('Should handle http errors', (done) => {
      component.appConfig = { namespace: 'test1', data: {}, description: 'test' };
      component.editLevel = 3;
      component.onError = () => { console.log('error'); };
      const spy = spyOn(component, 'onError');
      component.submit();
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.error).toEqual('test');
        done();
      }, 0);
    });
    it('Should submit the form to edit data', (done) => {
      component.appConfig = { namespace: 'test', data: {}, description: 'test' };
      component.editLevel = 2;
      const spy = spyOn(component.bsModalRef, 'hide');
      component.submit();
      expect(component.error).toEqual(null);
      setTimeout(() => {
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      }, 0);
    });
    it('Should handle http errors while editing', (done) => {
      component.appConfig = { namespace: 'test1', data: {}, description: 'test' };
      component.editLevel = 2;
      component.onError = () => { console.log('error'); };
      const spy = spyOn(component, 'onError');
      component.submit();
      setTimeout(() => {
        expect(spy).toHaveBeenCalled();
        expect(component.error).toEqual('test');
        done();
      }, 0);
    });
  });
});
