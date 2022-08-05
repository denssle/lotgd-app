import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {DebugService} from '../../services/debug.service';
import {SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  html: SafeHtml;

  constructor(private parseService: HtmlParseService, private debugService: DebugService) {
  }

  ngOnInit(): void {
    this.parseService.observeSanitizedHTML().subscribe((html: SafeHtml) => {
      if (html) {
        this.html = html;
      }
    });
  }
}
