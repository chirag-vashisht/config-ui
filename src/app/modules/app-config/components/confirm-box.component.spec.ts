import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmBoxComponent } from './confirm-box.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalMockService } from '../mocks';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

describe('ConfirmBoxComponent', () => {
  let component: ConfirmBoxComponent;
  let fixture: ComponentFixture<ConfirmBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmBoxComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ModalModule.forRoot()],
      providers: [{ provide: BsModalRef, useClass: BsModalMockService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle on confirmed event', () => {
    component.onConfirmed = () => { console.log('called'); };
    component.data = {};
    const spy = spyOn(component, 'onConfirmed');
    component.confirmed();
    expect(spy).toHaveBeenCalledWith(component.data);
  });
  it('should be hidden on confirmed', () => {
    component.data = {};
    const spy = spyOn(component.bsModalRef, 'hide');
    component.confirmed();
    expect(spy).toHaveBeenCalled();
  });
});
