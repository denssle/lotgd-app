import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../../services/debug.service';

@Component({
  selector: 'app-debug-menu',
  templateUrl: './profile-burger-menu.component.html',
  styleUrls: ['./profile-burger-menu.component.scss'],
})
export class ProfileBurgerMenuComponent implements OnInit {
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
