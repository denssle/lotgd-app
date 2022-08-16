import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../services/debug.service';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent implements OnInit {
  debugMessages: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private debugService: DebugService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
