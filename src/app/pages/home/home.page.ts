import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  html: SafeHtml;

  constructor(private httpServie: HttpService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.httpServie.getStartPage();

    this.httpServie.observeHTML().subscribe(value => {
      if(value) {
        console.log(value.indexOf('<!--'));
        console.log(value.indexOf('<!--', 350));
        this.html = this.sanitizer.bypassSecurityTrustHtml(value);
        const el = document.createElement( 'html' );
        el.innerHTML = value;
        const html: HTMLCollection = el.getElementsByTagName('script');
        const list = Array.from(html);
        list.forEach(value1 => console.log(value1.innerHTML));
      }
    });
  }
}
