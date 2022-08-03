import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.page.html',
  styleUrls: ['./maintab.page.scss'],
})
export class MaintabPage implements OnInit {
  elements: Element[] = [];

  constructor(private responseService: HtmlResponseService) {
  }

  ngOnInit() {
    this.responseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.responseService.getMainElements();
    });
  }
}
