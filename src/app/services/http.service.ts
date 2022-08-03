import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';
import {HttpClient} from '@angular/common/http';
import {PlatformService} from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private sub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private desktopHttp: HttpClient, private nativeHTTP: HTTP, private platformService: PlatformService) {
  }

  public get(url: string, headers: any): Promise<any> {
    if (this.platformService.isRunningOnDesktop()) {
      return this.desktopHttp.get(url, headers).toPromise();
    }

    return this.nativeHTTP.get(url, {}, headers);
  }

  public post(url: string, body: any, headers: any): Promise<any> {
    if (this.platformService.isRunningOnDesktop()) {
      return this.desktopHttp.post(url, body, headers).toPromise();
    }

    return this.nativeHTTP.post(url, body, headers);
  }

  public observeHTML(): Observable<string> {
    return this.sub.asObservable();
  }
}
