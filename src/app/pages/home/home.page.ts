import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewChecked {
  html: SafeHtml;
  private subscribedToLogin: boolean;
  private name: string;
  private password: string;

  constructor(private httpServie: HttpService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.httpServie.getStartPage();

    this.httpServie.observeHTML().subscribe((html: string) => {
      if (html) {
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
        this.html = this.sanitizer.bypassSecurityTrustHtml(containerHTML.innerHTML);
        this.subscribedToLogin = false;
      }
    });
  }

  public ngAfterViewChecked(): void {
    const loginButton = document.getElementById('login');
    const nameInput = document.getElementById('name');
    const passwordInput = document.getElementById('password');
    if (loginButton && !this.subscribedToLogin && nameInput && passwordInput) {
      this.subscribedToLogin = true;
      loginButton.addEventListener('click', () => {
        this.httpServie.login(this.name, this.password);
      });
      nameInput.addEventListener('input', ($event) => {
        this.name = $event.target['value'];
      });
      passwordInput.addEventListener('input', ($event) => {
        this.password = $event.target['value'];
      });
    }
  }

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
