import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';
import {NavElement} from '../../models/NavElement';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage implements OnInit {
  elements: NavElement[] = [];

  constructor(private responseService: HtmlResponseService) {
  }

  ngOnInit() {
    this.responseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.responseService.getNavElements();
    });
  }

}
