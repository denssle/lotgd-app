import {Component} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {Subscription} from 'rxjs';
import {MenuController} from '@ionic/angular';

@Component({
  selector: 'app-statstab',
  templateUrl: './statstab.page.html',
  styleUrls: ['./statstab.page.scss'],
})
export class StatstabPage {
  elements: Element[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService, private menu: MenuController) {
  }

  ionViewWillEnter() {
    this.subscriptions.push(this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getPetitionElements();
    }));
  }

  ionViewWillLeave(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  // Manchmal öffnet das Menu nicht, das erzwingt es.
  onMenuButtonClick() {
    const menuid = 'stats-menu-id';
    this.menu.isOpen(menuid).then(value => {
      if (!value) {
        this.menu.enable(true, menuid);
        this.menu.open(menuid);
      }
    });
  }
}
