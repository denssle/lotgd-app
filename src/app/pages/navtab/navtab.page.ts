import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';
import {NavElement} from '../../models/NavElement';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage implements OnInit {
  elements: NavElement[] = [];

  constructor(private responseService: HtmlResponseService, private http: HttpService) {
  }

  ngOnInit() {
    this.responseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.responseService.getNavElements();
    });
  }

  onClick(element: NavElement) {
    this.http.get(element.url, {});
  }
}
