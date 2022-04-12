import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  html: string;

  constructor(private httpServie: HttpService) {
  }

  ngOnInit(): void {
    this.httpServie.getStartPage();
    this.httpServie.observeHTML().subscribe(value => {
      this.html = value;
    });
  }


}
