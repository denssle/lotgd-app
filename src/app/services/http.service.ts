import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  public getStartPage() {
    this.httpClient.get('https://lotgd.de/home.php?', {
        headers: {
          'Accept': 'text/html, application/xhtml+xml, */*',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      responseType: 'text'
      }).toPromise()
      .then(value => {
      console.log(value);
    })
      .catch(reason => {
        console.log('Http failed', reason);
      });
  }
}
