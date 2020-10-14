import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/response-models/generic-response.model';
import { map } from 'rxjs/operators';
import { FlagsService } from './flags.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorsService {
  constructor(private flags: FlagsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let httpsReq = req.clone();

    this.flags.loading = true;

    if (!httpsReq.headers.has('Content-Type')) {
      httpsReq = httpsReq.clone({
        headers: httpsReq.headers.append('Content-Type', 'application/json'),
        withCredentials: true,
      });
    }

    return next.handle(httpsReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          try {
            const responseModel: GenericResponse = event.body;
            if (responseModel.payload) {
              return event.clone({
                body: responseModel.payload,
              });
            } else {
              return event;
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      })
    );
  }
}
