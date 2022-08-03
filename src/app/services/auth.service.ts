import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HtmlResponseService} from './html-response.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService, private debugService: DebugService,
              private router: Router, private responseService: HtmlResponseService) {
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        const response = value as HTTPResponse;
        // this.debug.debug('AUTH: header: ' + JSON.stringify(response.headers));
        this.responseService.update(response.data);
        if (this.responseService.isLoggedIn()) {
          this.authenticated.next(true);
          this.router.navigate(['home']);
        } else {
          this.debugService.debug('Auth failed ');
        }
      })
      .catch(reason => {
        this.debugService.debug('ERROR: ' + reason);
        this.debugService.debug('ERROR: stringify: ' + JSON.stringify(reason));
        this.authenticated.next(false);
      });
  }
}
