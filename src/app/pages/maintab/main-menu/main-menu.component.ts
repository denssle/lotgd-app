import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../../services/debug.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
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
