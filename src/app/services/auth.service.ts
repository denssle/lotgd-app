import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {Router} from '@angular/router';
import {HtmlParseService} from './html-parse.service';
import {PopupAndToastService} from './popup-and-toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private debugService: DebugService,
              private router: Router, private parseService: HtmlParseService,
              private toastService: PopupAndToastService) {
    this.parseService.observeHTML().subscribe(() => {
      if(!this.parseService.isLoggedIn()) {
        this.router.navigate(['login']);
      }
    });
  }

  public login(name: string, password: string) {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        const response = value as HTTPResponse;
        this.parseService.update(response.data);
        if (this.parseService.isLoggedIn()) {
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
      });
  }
}
