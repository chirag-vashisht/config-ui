import { TestBed, inject } from '@angular/core/testing';
import { TradeService } from './trade.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  Response, ResponseOptions, Http, ResponseType,
  ConnectionBackend, BaseRequestOptions, RequestOptions
} from '@angular/http';
import { MockError } from '../mocks';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions }, Http, TradeService]
    });
  });

  it('should be created', inject([TradeService],
    (service: TradeService) => {
      expect(service).toBeTruthy();
    }));

  it('should provide configurations', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      expect(service).toBeTruthy();
      service.apiUrl = 'api';
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations');
        conn.mockRespond(new Response(
          new ResponseOptions({
            body:
            '[{"namespace":"test","data": {},"description": "test" }]'
          })));
      });
      service.getTrades().then((data) => {
        expect(data).toEqual([{ namespace: 'test', data: {}, description: 'test' }]);
      });
      backend.verifyNoPendingRequests();
    }));
  it('should provide configuration by namespace', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      expect(service).toBeTruthy();
      service.apiUrl = 'api';
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations/test');
        conn.mockRespond(new Response(
          new ResponseOptions({
            body:
            '{"namespace":"test","data": {},"description": "test" }'
          })));
      });
      service.getConfiguration('test').then((data) => {
        expect(data).toEqual({ namespace: 'test', data: {}, description: 'test' });
      });
      backend.verifyNoPendingRequests();
    }));
  it('should add configuration', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      service.apiUrl = 'api';
      expect(service).toBeTruthy();
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations');
        conn.mockRespond(new Response(
          new ResponseOptions({
            body:
            '{"namespace":"test","data": {},"description": "test" }'
          })));
      });
      service.addConfiguration({
        namespace: 'test',
        data: {}, description: 'test'
      }).then((data) => {
        expect(data).toEqual({ namespace: 'test', data: {}, description: 'test' });
      });
      backend.verifyNoPendingRequests();
    }));
  it('should update configuration', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      service.apiUrl = 'api';
      expect(service).toBeTruthy();
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations/test');
        conn.mockRespond(new Response(
          new ResponseOptions({
            body:
            '{"ok":1}'
          })));
      });
      service.updateConfiguration('test', {}).then((data) => {
        expect(data).toEqual({ ok: 1 });
      });
      backend.verifyNoPendingRequests();
    }));
  it('should delete configuration', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      service.apiUrl = 'api';
      expect(service).toBeTruthy();
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations/test');
        conn.mockRespond(new Response(
          new ResponseOptions({
            body:
            '{"ok":1}'
          })));
      });
      service.deleteConfiguration('test').then((data) => {
        expect(data).toEqual({ ok: 1 });
      });
      backend.verifyNoPendingRequests();
    }));
  it('should handle error', inject([ConnectionBackend, TradeService],
    (backend: MockBackend, service: TradeService) => {
      service.apiUrl = 'api';
      expect(service).toBeTruthy();
      backend.connections.subscribe((conn: MockConnection) => {
        expect(conn.request.url).toContain('api/configurations/test');
        const body = JSON.stringify({ key: 'val' });
        const opts = { type: ResponseType.Error, status: 404, body };
        const responseOpts = new ResponseOptions(opts);
        conn.mockError(new MockError(responseOpts));
      });
      service.deleteConfiguration('test').catch((error) => {
        expect(error).toEqual({ key: 'val' });
      });
      backend.verifyNoPendingRequests();
    }));
});
