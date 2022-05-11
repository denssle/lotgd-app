import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private sub: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient) {
  }

  public getStartPage() {
    const promise = this.httpClient.get('https://lotgd.de/home.php?', {
      headers: {
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/json; charset=utf-8'
      },
      responseType: 'text'
    }).toPromise();

    promise
      .then(value => {
        this.sub.next(value);
      })
      .catch(reason => {
        console.log('Http failed', reason);
      });

    return promise;
  }

  public login(name: string, password: string) {
    this.httpClient.post('http://lotgd.de/login.php?', {name: name, password: password}).toPromise()
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
