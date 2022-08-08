import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {DebugService} from '../../services/debug.service';
import {SafeHtml} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  html: SafeHtml;
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService, private debugService: DebugService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe((html: SafeHtml) => {
      if (html) {
        this.html = html;
      }
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }
}
