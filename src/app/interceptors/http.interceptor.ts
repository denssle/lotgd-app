import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

	constructor() {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const baseUrl: string = document.getElementsByTagName('base')[0].href;
		if (req.url.includes('lotgd.de')) {
      return next.handle(req.clone({url: `${req.url}`}));
		}
    if(req.url.includes('templates')) {
      console.log('image');
    }
    return next.handle(req.clone({url: `${baseUrl}${req.url}`}));
	}
}
