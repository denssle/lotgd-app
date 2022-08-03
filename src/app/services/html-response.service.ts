import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HtmlResponseService {
  private lastHTML: BehaviorSubject<SafeHtml> = new BehaviorSubject<SafeHtml>(null);

  constructor(private sanitizer: DomSanitizer) {
  }

  update(value: string) {
    this.lastHTML.next(this.reformatHTML(value));
  }

  observeHTML(): Observable<SafeHtml> {
    return this.lastHTML.asObservable();
  }

  private reformatHTML(html: string): SafeHtml {
    const containerHTML: HTMLElement = document.createElement('html');
    if (html) {
      containerHTML.innerHTML = html;
      this.removeImgs(containerHTML);
      this.removeScipts(containerHTML);

      const nav: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('nav');
      const main: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('main');
      const stats: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('stats');
      const footer: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('footer');
      nav.item(0)?.remove();
      stats.item(0)?.remove();
      footer.item(0)?.remove();
    }
    return this.sanitizer.bypassSecurityTrustHtml(containerHTML.innerHTML);
  }

  private removeScipts(containerHTML: HTMLElement) {
    Array.from(containerHTML.getElementsByTagName('script')).forEach(value => {
      value.remove();
    });
  }

  private removeImgs(containerHTML: HTMLElement): void {
    Array.from(containerHTML.getElementsByTagName('img')).forEach(value => {
      value.remove();
    });
  }
}
