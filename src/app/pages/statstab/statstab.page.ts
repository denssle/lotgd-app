import {Component, OnInit} from '@angular/core';
import {HtmlResponseService} from '../../services/html-response.service';

@Component({
  selector: 'app-statstab',
  templateUrl: './statstab.page.html',
  styleUrls: ['./statstab.page.scss'],
})
export class StatstabPage implements OnInit {
  elements: Element[] = [];

  constructor(private responseService: HtmlResponseService) {
  }

  ngOnInit() {
    this.responseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.responseService.getPetitionElements();
    });
  }

}
