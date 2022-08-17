import {Injectable} from '@angular/core';
import {NativeStorage} from '@awesome-cordova-plugins/native-storage/ngx';
import {User} from '../models/User';
import {DebugService} from './debug.service';
import {PlatformService} from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userskey = 'USERS_KEY';

  constructor(private nativeStorage: NativeStorage, private debugService: DebugService, private platformService: PlatformService) {
  }

  public saveUser(user: User): void {
    if (this.platformService.isRunningMobile()) {
      this.getUsers().then(loaded => {
        if (loaded && loaded.length > 0) {
          const index = loaded.indexOf(user);
          if (index) {
            // already existing
            loaded[index] = user;
          } else {
            loaded.push(user);
          }
          this.nativeStorage.setItem(this.userskey, JSON.stringify(loaded))
            .catch(reason => {
              this.handleError('SAVE: ' + reason);
            });
        } else {
          this.nativeStorage.setItem(this.userskey, JSON.stringify([user]))
            .catch(reason => {
              this.handleError('SAVE: ' + reason);
            });
        }
      });
    }
  }

  public getUsers(): Promise<User[]> {
    if (this.platformService.isRunningMobile()) {
      return new Promise<User[]>((resolve, reject) => {
        this.loadUsers().then(value => {
          resolve(value);
        }).catch(reason => {
          this.handleError('LOAD: ' + reason);
          reject(reason);
        });
      });
    }
    return new Promise<User[]>(resolve => {
      resolve([]);
    });
  }

  private async loadUsers(): Promise<User[]> {
    try {
      const item: string = await this.nativeStorage.getItem(this.userskey);
      return JSON.parse(item);
    } catch (e) {
      this.handleError('LOAD: ' + e);
      return [];
    }
  }

  private handleError(reason: string) {
    this.debugService.debug('Storage Service Error: ' + reason);
  }
}
