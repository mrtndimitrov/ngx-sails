import { IRawSailsResponse } from './interfaces';
import { SailsError, SailsResponse } from './sails-response';

import { ISailsRequest } from './index';
import { SocketIOSocket } from '../io';
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';
import {map} from 'rxjs/internal/operators/map';
import {Subject} from 'rxjs/internal/Subject';

export class SailsRequest {
  static send(request: ISailsRequest, io: SocketIOSocket, errorsSubject: Subject<SailsError>) {
    const { method } = request;

    request.headers = lowerCaseHeaders(request.headers);

    return Observable.create((obs: Observer<IRawSailsResponse>) => {
      io.emit(method, request, (rawResponse: IRawSailsResponse) => {
        if (rawResponse.statusCode >= 400) {
          const error = new SailsError(rawResponse, request);
          errorsSubject.next(error);
          obs.error(error);
        } else {
          obs.next(rawResponse);
        }
        obs.complete();
      });
    }).pipe(map((response: IRawSailsResponse) => new SailsResponse(response, request)));
  }
}

function lowerCaseHeaders(headers: any) {
  Object.keys(headers).forEach(header => {
    if (header.toLowerCase() !== header) {
      headers[header.toLowerCase()] = headers[header];
      delete headers[header];
    }
  });

  return headers;
}
