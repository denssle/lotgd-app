import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../../services/debug.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit {
  selectOptions: string[] = ['all', 'error', 'info'];
  subscriptions: Subscription[] = [];
  debugMessages: string[];

  constructor(private debugService: DebugService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.debugService.observe().subscribe(value => {
      this.debugMessages = value;
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  deleteAll(): void {
    this.debugService.reset();
  }
}
