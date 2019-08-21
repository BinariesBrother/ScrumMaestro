import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SMGAuthService} from "../smgapi/smg-auth.service";

@Injectable()
export class InterceptorGoogle implements HttpInterceptor {
  constructor(public auth: SMGAuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const newRequest: HttpRequest<any> = request.clone({
      url: 'https://www.googleapis.com/calendar/v3' + request.url,
      setHeaders: {
        Authorization: `Bearer ${SMGAuthService.getToken()}`
      },
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    });
    return next.handle(newRequest);
  }
}
