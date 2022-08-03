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

  constructor(private http: HttpService, private debug: DebugService,
              private router: Router, private responseService: HtmlResponseService) {
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        const response = value as HTTPResponse;
        // this.debug.debug('AUTH: header: ' + JSON.stringify(response.headers));
        this.authenticated.next(true);
        this.responseService.update(JSON.stringify(response.data));
        this.router.navigate(['home']);
      })
      .catch(reason => {
        this.debug.debug('ERROR: ' + JSON.stringify(reason));
      });
  }
}
