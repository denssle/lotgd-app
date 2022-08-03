import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HtmlResponseService {
  private lastHTML: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
  }

  update(value: string) {
    this.lastHTML.next(value);
  }

  observeHTML(): Observable<string> {
    return this.lastHTML.asObservable();
  }

  /*
  const containerHTML: HTMLElement = document.createElement('html');
        containerHTML.innerHTML = html;
        const nav: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('nav');
        const main: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('main');
        const stats: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('stats');
        const footer: HTMLCollectionOf<Element> = containerHTML.getElementsByClassName('footer');
        nav.item(0).remove();
        stats.item(0).remove();
        footer.item(0).remove();
        this.removeImgs(containerHTML);
        const buttons = containerHTML.getElementsByClassName('button');
        Array.from(buttons).forEach(button => {
          if (button.outerHTML.includes('submit')) {
            const buttonValue: string = button.getAttribute('value');
            if (buttonValue === 'Log in') {
              const parent: HTMLElement = button.parentElement;
              const newButton = document.createElement('input');
              newButton.type = 'button';
              newButton.className = 'button';
              newButton.value = buttonValue;
              newButton.id = 'login';
              parent.appendChild(newButton);
            }
            button.remove();
          }
        });
   */

  private printScipts(containerHTML: HTMLElement) {
    const scriptCollection: HTMLCollection = containerHTML.getElementsByTagName('script');
    const list = Array.from(scriptCollection);
    list.forEach(script => console.log(script.innerHTML));
  }

  private removeImgs(containerHTML: HTMLElement): void {
    Array.from(containerHTML.getElementsByTagName('img')).forEach(value => {
      value.remove();
    });
  }
}
