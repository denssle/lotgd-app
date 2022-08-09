import {Component} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {NavElement} from '../../models/NavElement';
import {HttpService} from '../../services/http.service';
import {Subscription} from 'rxjs';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage{
  elements: NavElement[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService, private http: HttpService, private menu: MenuController) {
  }

  ionViewWillEnter() {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe(() => {
      const newElements = this.parseService.getNavElements();
      if (newElements && newElements.length > 0) {
        this.elements = newElements;
      } else {
        this.elements = [];
      }
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  onClick(element: NavElement) {
    this.http.get(element.url, {});
  }

  // Manchmal öffnet das Menu nicht, das erzwingt es.
  onMenuButtonClick() {
    const menuid = 'nav-menu-id';
    this.menu.isOpen(menuid).then(value => {
      if (!value) {
        this.menu.enable(true, menuid);
        this.menu.open(menuid);
      }
    });
  }
}
