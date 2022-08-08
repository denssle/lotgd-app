import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-statstab',
  templateUrl: './statstab.page.html',
  styleUrls: ['./statstab.page.scss'],
})
export class StatstabPage implements OnInit {
  elements: Element[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getPetitionElements();
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

}
