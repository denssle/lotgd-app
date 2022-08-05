import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HtmlResponseService} from './html-response.service';
import {PopupAndToastService} from './popup-and-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpService, private debugService: DebugService,
              private router: Router, private responseService: HtmlResponseService,
              private toastService: PopupAndToastService) {
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        const response = value as HTTPResponse;
        this.responseService.update(response.data);
        if (this.responseService.isLoggedIn()) {
          this.authenticated.next(true);
          this.router.navigate(['home', 'maintab']);
          this.toastService.openToast('Willkommen ' + name, 'Login erfolgreich.');
        } else {
          this.debugService.debug('Auth failed ');
          this.toastService.openToast('Login gescheitert', 'Checke Name und Password.');
        }
      })
      .catch(reason => {
        this.debugService.debug('ERROR: ' + reason);
        this.debugService.debug('ERROR: stringify: ' + JSON.stringify(reason));
        this.authenticated.next(false);
      });
  }
}
