import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DebugService} from './debug.service';
import {HTTPResponse} from '@awesome-cordova-plugins/http/ngx';
import {Router} from '@angular/router';
import {HtmlParseService} from './html-parse.service';
import {PopupAndToastService} from './popup-and-toast.service';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  private key = 'AUTH_SERVICE_LS_KEY';

  constructor(private http: HttpService, private debugService: DebugService,
              private router: Router, private parseService: HtmlParseService,
              private toastService: PopupAndToastService) {
    this.parseService.observeHTML().subscribe(() => {
      if (!this.parseService.isLoggedIn()) {
        this.logout();
      }
    });
  }

  public login(name: string, password: string) {
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
          this.saveUserLocal(this.user);
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

  public getSavedUsers(): User[] {
    return this.loadLocalSavedUsers();
  }

  private saveUserLocal(user: User) {
    const loaded = this.loadLocalSavedUsers();
    const index = loaded.indexOf(user);
    if (index) {
      // already existing
      loaded[index] = user;
    } else {
      loaded.push(user);
    }
    localStorage.setItem(this.key, JSON.stringify(loaded));
  }

  private loadLocalSavedUsers(): User[] {
    const loaded = localStorage.getItem(this.key);
    if (loaded) {
      return JSON.parse(localStorage.getItem(this.key));
    }
    return [];
  }
}
