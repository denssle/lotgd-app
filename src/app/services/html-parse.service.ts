import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {DebugService} from './debug.service';
import {NavElement} from '../models/NavElement';

@Injectable({
  providedIn: 'root'
})
export class HtmlParseService {
  private htmlElement: BehaviorSubject<HTMLElement> = new BehaviorSubject<HTMLElement>(null);
  private sanitizerHtmlElement: BehaviorSubject<SafeHtml> = new BehaviorSubject<SafeHtml>(null);

  constructor(private sanitizer: DomSanitizer, private debugService: DebugService) {
  }

  update(value: string): void {
    if (value) {
      const html: HTMLElement = this.reformatHTML(value);
      this.htmlElement.next(html);
      this.sanitizerHtmlElement.next(this.sanitizer.bypassSecurityTrustHtml(html.innerHTML));
    }
  }

  observeHTML(): Observable<HTMLElement> {
    return this.htmlElement.asObservable();
  }

  observeSanitizedHTML(): Observable<SafeHtml> {
    return this.sanitizerHtmlElement.asObservable();
  }

  public isLoggedIn(): boolean {
    // TODO better check
    return this.findElementsByClassName('charinfo')?.length > 0 && !location.toString().includes('/home.php?');
  }

  public getNavElements(): NavElement[] {
    const links: NavElement[] = [];
    this.findElementsByClassName('navcontainer').forEach(value => {
      Array.from(value.getElementsByTagName('a')).forEach(linkElement => {
        const url: string = this.fixURL(String(linkElement));
        links.push({
          url,
          label: linkElement.innerText,
        });
      });
    });
    return links;
  }

  public getMainElements(): Element[] {
    return this.findElementsByClassName('main');
  }

  public getPetitionElements(): Element[] {
    return this.findElementsByClassName('petitionclass');
  }

  private fixURL(url: string) {
    return url.replace('http://localhost', 'https://lotgd.de');
  }

  private reformatHTML(html: string): HTMLElement {
    const containerHTML: HTMLElement = document.createElement('html');
    if (html) {
      containerHTML.innerHTML = html;
      Array.from(containerHTML.getElementsByTagName('a')).forEach(value => {
        if (value.href) {
          value.href = this.fixURL(String(value));
        } else {
          this.debugService.debug('Link without href' + value + ' ' + value.innerText);
        }
      });
    }
    return containerHTML;
  }

  private findElementsByClassName(className: string): Element[] {
    if (this.htmlElement.getValue() && className) {
      return Array.from(this.htmlElement.getValue().getElementsByClassName(className));
    }
    return [];
  }
}
