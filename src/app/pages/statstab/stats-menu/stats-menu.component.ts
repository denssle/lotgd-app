import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../../services/debug.service';

@Component({
  selector: 'app-stats-menu',
  templateUrl: './stats-menu.component.html',
  styleUrls: ['./stats-menu.component.scss'],
})
export class StatsMenuComponent implements OnInit {
  selectOptions: string[] = ['all', 'error', 'info'];
  subscriptions: Subscription[] = [];
  debugMessages: string[];

  constructor(private debug: DebugService) {
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
}
