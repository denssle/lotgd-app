import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  html: SafeHtml;

  constructor(private httpServie: HttpService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.httpServie.getStartPage();

    this.httpServie.observeHTML().subscribe((html: string) => {
      if (html) {
        console.log(html);
        this.html = this.sanitizer.bypassSecurityTrustHtml(html);
        const containerHTML: HTMLElement = document.createElement('html');
        containerHTML.innerHTML = html;
        const scriptCollection: HTMLCollection = containerHTML.getElementsByTagName('script');
        const list = Array.from(scriptCollection);
        list.forEach(script => console.log(script.innerHTML));
      }
    });
  }
}
