import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';

@Component({
  selector: 'app-navtab',
  templateUrl: './navtab.page.html',
  styleUrls: ['./navtab.page.scss'],
})
export class NavtabPage implements OnInit {
  elements: Element[] = [];

  constructor(private responseService: HtmlResponseService) {
  }

  ngOnInit() {
    this.responseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.responseService.getNavElements();
    });
  }

}
