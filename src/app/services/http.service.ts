import {Injectable} from '@angular/core';
import {HTTP, HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {HtmlResponseService} from './html-response.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private nativeHTTP: HTTP, private responseService: HtmlResponseService) {
  }

  public get(url: string, headers?: any): Promise<any> {
    const promise = this.nativeHTTP.get(url, {}, headers);
    promise.then(value => {
      const response = value as HTTPResponse;
      this.responseService.update(response.data);
    });
    return promise;
  }

  public post(url: string, body: any, headers: any): Promise<any> {
    const promise = this.nativeHTTP.post(url, body, headers);
    promise.then(value => {
      const response = value as HTTPResponse;
      this.responseService.update(response.data);
    });
    return promise;
  }
}
