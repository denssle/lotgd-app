import {Component, Input, OnInit} from '@angular/core';
import {DebugService} from '../../services/debug.service';
import {AuthService} from '../../services/auth.service';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-general-menu',
  templateUrl: './general-menu.component.html',
  styleUrls: ['./general-menu.component.scss'],
})
export class GeneralMenuComponent implements OnInit {
  @Input() title: string;
  selectOptions: string[] = ['all', 'error', 'info'];

  constructor(private debugService: DebugService, private auth: AuthService, private http: HttpService) {
  }

  ngOnInit() {
  }

  ionViewWillLeave(): void {
  }

  clickLogout() {
    this.auth.logout();
  }

  clickRefresh() {
    this.http.get('https://lotgd.de');
  }
}
