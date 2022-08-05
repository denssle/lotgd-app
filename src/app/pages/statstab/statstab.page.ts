import {Component, OnInit} from '@angular/core';
import {HtmlParseService} from '../../services/html-parse.service';

@Component({
  selector: 'app-statstab',
  templateUrl: './statstab.page.html',
  styleUrls: ['./statstab.page.scss'],
})
export class StatstabPage implements OnInit {
  elements: Element[] = [];

  constructor(private parseService: HtmlParseService) {
  }

  ngOnInit() {
    this.parseService.observeSanitizedHTML().subscribe(() => {
      this.elements = this.parseService.getPetitionElements();
    });
  }

}
