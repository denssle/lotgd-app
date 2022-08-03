import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DebugService} from './debug.service';

@Injectable({
  providedIn: 'root'
})
export class HtmlResponseService {
  private htmlElement: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(null);
  private sanitizerHtmlElement: BehaviorSubject<SafeHtml> = new BehaviorSubject<SafeHtml>(null);

  constructor(private sanitizer: DomSanitizer, private debugService: DebugService) {
  }

  update(value: string): void {
    const html: HTMLElement = this.reformatHTML(value);
    this.htmlElement.next(html);
    this.sanitizerHtmlElement.next(this.sanitizer.bypassSecurityTrustHtml(html.innerHTML));
    this.debugService.debug('nav: ' + this.findElementsByClassName('nav')?.length);
    this.debugService.debug('main: ' + this.findElementsByClassName('main')?.length);
    this.debugService.debug('stats: ' + this.findElementsByClassName('stats')?.length);
    this.debugService.debug('footer: ' + this.findElementsByClassName('footer')?.length);
    this.debugService.debug('maincontainer: ' + this.findElementsByClassName('maincontainer')?.length);
    this.debugService.debug('maincont: ' + this.findElementsById('maincont')?.length);
    this.debugService.debug('navigation: ' + this.findElementsById('navigation')?.length);
    this.debugService.debug('petition: ' + this.findElementsById('petition')?.length);
  }

  observeHTML(): Observable<HTMLElement> {
    return this.htmlElement.asObservable();
  }

  observeSanitizedHTML(): Observable<SafeHtml> {
    return this.sanitizerHtmlElement.asObservable();
  }

  public isLoggedIn(): boolean {
    return this.findElementsByClassName('stats')?.length > 0;
  }

  private reformatHTML(html: string): HTMLElement {
    const containerHTML: HTMLElement = document.createElement('html');
    if (html) {
      containerHTML.innerHTML = html;
      this.removeImgs(containerHTML);
      this.removeScipts(containerHTML);
    }
    return containerHTML;
  }

  private findElementsByClassName(className: string): Element[] {
    return Array.from(this.htmlElement.getValue().getElementsByClassName(className));
  }

  private findElementsById(id: string) {
    return Array.from(this.htmlElement.getValue().getElementsByTagName(id));
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
