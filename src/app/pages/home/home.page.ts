import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';
import {DebugService} from '../../services/debug.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  html: string;

  constructor(private responseService: HtmlResponseService, private debug: DebugService) {
  }

  ngOnInit(): void {
    this.responseService.observeHTML().subscribe((html: string) => {
      if (html) {
        this.debug.debug('incoming html' + html.length);
        this.html = html;
      }
    });
  }
}
