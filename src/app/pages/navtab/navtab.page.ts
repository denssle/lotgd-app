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
      this.elements = this.parseService.getNavElements();
    });
  }

  onClick(element: NavElement) {
    this.http.get(element.url, {});
  }
}
