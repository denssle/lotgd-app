import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(private platform: Platform) {
  }

  public isRunningOnDesktop(): boolean {
    return this.platform.is('desktop') || this.platform.is('mobileweb');
  }
}
