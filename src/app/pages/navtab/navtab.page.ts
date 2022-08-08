import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';
import {NavElement} from '../../models/NavElement';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage implements OnInit {
  elements: NavElement[] = [];

  constructor(private parseService: HtmlParseService, private http: HttpService) {
  }

  ngOnInit() {
    this.parseService.observeSanitizedHTML().subscribe(() => {
      const newElements = this.parseService.getNavElements();
      if (newElements && newElements.length > 0) {
        this.elements = newElements;
      } else {
        this.elements = [];
      }
    });
  }

  onClick(element: NavElement) {
    this.http.get(element.url, {});
  }
}
