import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorsService {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let httpsReq = req.clone();

    if (!httpsReq.headers.has('Content-Type')) {
      httpsReq = httpsReq.clone({
        headers: httpsReq.headers.append('Content-Type', 'application/json'),
        withCredentials: true,
      });
    }

    return next.handle(httpsReq);
  }
}
