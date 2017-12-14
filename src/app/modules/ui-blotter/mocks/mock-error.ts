import { Response, ResponseOptions, ResponseType, Request } from '@angular/http';

export class MockError extends Response implements Error {
    public name: any;
    public message: any;
}
