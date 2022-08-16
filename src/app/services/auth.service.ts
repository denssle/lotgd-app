import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {Router} from '@angular/router';
import {HtmlParseService} from './html-parse.service';
import {PopupAndToastService} from './popup-and-toast.service';
import {User} from '../models/User';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;

  constructor(private http: HttpService, private debugService: DebugService,
              private router: Router, private parseService: HtmlParseService,
              private toastService: PopupAndToastService, private storageService: StorageService) {
    this.parseService.observeHTML().subscribe(() => {
      if (!this.parseService.isLoggedIn()) {
        this.logout();
      }
    });
  }

  public login(name: string, password: string): void {
    this.http.post('https://lotgd.de/login.php?', {name, password}, {})
      .then(value => {
        const response = value as HTTPResponse;
        this.parseService.update(response.data);
        if (this.parseService.isLoggedIn()) {
          this.user = {
            id: null,
            name,
            password
          };
          this.storageService.saveUser(this.user);
          this.router.navigate(['home', 'maintab']);
          this.toastService.openToast('Willkommen ' + name, 'Login erfolgreich.');
        } else {
          this.user = null;
          this.debugService.debug('Auth failed ');
          this.toastService.openToast('Login gescheitert', 'Checke Name und Password.');
        }
      })
      .catch(reason => {
        this.debugService.debug('ERROR: ' + reason);
        this.debugService.debug('ERROR: stringify: ' + JSON.stringify(reason));
      });
  }

  public logout(): void {
    this.router.navigate(['login']);
    this.user = null;
  }
}
