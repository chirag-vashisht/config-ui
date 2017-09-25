import { Injectable } from '@angular/core';

@Injectable()
export class BsModalMockService {
  public content: any;
  constructor() {
    this.content = null;
  }

  public hide() {
    console.log(this.content);
  }
}
