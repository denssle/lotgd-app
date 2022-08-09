import {Component} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {Subscription} from 'rxjs';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.page.html',
  styleUrls: ['./maintab.page.scss'],
})
export class MaintabPage {
  elements: Element[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService, private menu: MenuController) {
  }

  ionViewWillEnter() {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getMainElements();
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  // Manchmal öffnet das Menu nicht, das erzwingt es.
  onMenuButtonClick() {
    const menuid = 'main-menu-id';
    this.menu.isOpen(menuid).then(value => {
      if (!value) {
        this.menu.enable(true, menuid);
        this.menu.open(menuid);
      }
    });
  }
}
