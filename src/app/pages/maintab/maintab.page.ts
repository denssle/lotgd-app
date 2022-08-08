import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.page.html',
  styleUrls: ['./maintab.page.scss'],
})
export class MaintabPage implements OnInit {
  elements: Element[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getMainElements();
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }
}
