import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private debug: DebugService) {
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        this.debug.debug('SUCCESS: ' + JSON.stringify(value));
      })
      .catch(reason => {
        this.debug.debug('ERROR: ' + reason);
      });
  }
}
