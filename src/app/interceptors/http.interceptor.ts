import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DebugService} from '../services/debug.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private debug: DebugService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl: string = document.getElementsByTagName('base')[0].href;
    if (req.url.includes('lotgd.de')) {
      return this.handleResponse(next.handle(req.clone({url: `${req.url}`})));
    }
    return this.handleResponse(next.handle(req.clone({url: `${baseUrl}${req.url}`})));
  }

  private handleResponse(source: Observable<HttpEvent<any>>): Observable<HttpEvent<any>> {
    source.toPromise()
      .then(value => {
        this.debug.debug('HttpInterceptor: ' + JSON.stringify(value));
      })
      .catch(reason => {
        this.debug.debug('HttpInterceptor Error: ' + JSON.stringify(reason));
      });
    return source;
  }
}
