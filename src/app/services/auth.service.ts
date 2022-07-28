import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private debug: DebugService) {
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        this.debug.debug('SUCCESS of Auth');
        const response = value as HTTPResponse;
        this.debug.debug('auth: header: ' + JSON.stringify(response.headers));
        this.debug.debug('auth: data: ' + JSON.stringify(response.data));
      })
      .catch(reason => {
        this.debug.debug('ERROR: ' + reason);
      });
  }
}
