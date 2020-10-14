import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { GenericResponse } from '../models/response-models/generic-response.model';
import { map, catchError } from 'rxjs/operators';
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
      }),
      catchError((error: HttpErrorResponse) => {
        this.flags.loading = false;
        switch (error.status) {
          case 400:
            try {
              let errorStatusCode400 = error.error.statusCode;
              switch (errorStatusCode400) {
                case 10001:
                case 10008:
                case 10009:
                case 10011:
                case 10054:
                case 10055:
                case 10056:
                default:
                  console.log('Error');
                  errorStatusCode400 = -1;
                  break;
              }
              return throwError(error);
            } catch (error) {
              return throwError(error);
            }
          case 401:
          case 404:
          case 500:
          default:
            console.log('Error');
            return throwError(error);
        }
      })
    );
  }
}
