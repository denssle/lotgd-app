import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private sub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HTTP) {
  }

  public getStartPage() {
    const promise = this.httpClient.get('https://lotgd.de/home.php?', {}, {
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'text/html, application/xhtml+xml, */*',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json; charset=utf-8'
      },
      responseType: 'text'
    });

    promise
      .then(value => {
        this.sub.next(value.data);
      })
      .catch(reason => {
        console.log('Http failed', reason);
      });

    return promise;
  }

  public login(name: string, password: string) {
    this.httpClient.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        console.log(value);
      })
      .catch(reason => {
        console.log(reason);
      });
  }

  public observeHTML(): Observable<string> {
    return this.sub.asObservable();
  }
}
