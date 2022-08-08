import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {DebugService} from '../../services/debug.service';

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
