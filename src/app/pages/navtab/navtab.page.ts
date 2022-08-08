import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {NavElement} from '../../models/NavElement';
import {HttpService} from '../../services/http.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage implements OnInit {
  elements: NavElement[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private parseService: HtmlParseService, private http: HttpService) {
  }

  ngOnInit() {
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
}
