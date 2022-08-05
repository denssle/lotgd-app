import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';

@Component({
  selector: 'app-maintab',
  templateUrl: './maintab.page.html',
  styleUrls: ['./maintab.page.scss'],
})
export class MaintabPage implements OnInit {
  elements: Element[] = [];

  constructor(private parseService: HtmlParseService) {
  }

  ngOnInit() {
    this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getMainElements();
    });
  }
}
