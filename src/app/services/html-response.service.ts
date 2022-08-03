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

  public getNavElements(): Element[] {
    return this.findElementsByClassName('navcontainer');
  }

  public getMainElements(): Element[] {
    return this.findElementsByClassName('main');
  }

  public getPetitionElements(): Element[] {
    return this.findElementsByClassName('petitionclass');
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
