import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {App, AppInfo} from '@capacitor/app';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {
  private appInfo: AppInfo;

  constructor(private platform: Platform) {
  }

  public isRunningOnDesktop(): boolean {
    return this.platform.is('desktop') || this.platform.is('mobileweb');
  }

  loadAppInfos(): void {
    if (this.isRunningOnDesktop()) {
      console.log('running on desktop, no app info. ');
    } else {
      App.getInfo()
        .then((appInfo: AppInfo) => {
          this.appInfo = appInfo;
        }).catch(reason => {
        console.error(reason);
      });
    }
  }

  getVersion(): string {
    return this.appInfo?.version ?? 'No version found. ';
  }
}
