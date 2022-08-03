import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';
import {DebugService} from '../../services/debug.service';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  html: SafeHtml;

  constructor(private responseService: HtmlResponseService, private debugService: DebugService) {
  }

  ngOnInit(): void {
    this.responseService.observeSanitizedHTML().subscribe((html: SafeHtml) => {
      if (html) {
        this.html = html;
      }
    });
  }
}
