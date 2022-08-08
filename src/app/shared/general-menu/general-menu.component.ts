import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../services/debug.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-general-menu',
  templateUrl: './general-menu.component.html',
  styleUrls: ['./general-menu.component.scss'],
})
export class GeneralMenuComponent implements OnInit {
  @Input() title: string;
  selectOptions: string[] = ['all', 'error', 'info'];
  debugMessages: string[];
  private subscriptions: Subscription[] = [];

  constructor(private debug: DebugService, private auth: AuthService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.debug.observe().subscribe(value => {
      this.debugMessages = value;
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  deleteAll(): void {
    this.debug.reset();
  }

  clickLogout() {
    this.auth.logout();
  }
}
