import {Injectable} from '@angular/core';
import {NativeStorage} from '@awesome-cordova-plugins/native-storage/ngx';
import {User} from '../models/User';
import {DebugService} from './debug.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userskey = 'USERS_KEY';

  constructor(private nativeStorage: NativeStorage, private debugService: DebugService) {
  }

  public saveUser(user: User) {
    this.getUsers().then(loaded => {
      if (loaded) {
        const index = loaded.indexOf(user);
        if (index) {
          // already existing
          loaded[index] = user;
        } else {
          loaded.push(user);
        }
        this.nativeStorage.setItem(this.userskey, loaded).catch(reason => {
          this.handleError(reason);
        });
      } else {
        this.nativeStorage.setItem(this.userskey, [user]).catch(reason => {
          this.handleError(reason);
        });
      }
    });
  }

  public getUsers(): Promise<User[]> {
    const promise = this.nativeStorage.getItem(this.userskey);
    promise.catch(reason => {
      this.handleError(reason);
    });
    return promise;
  }


  private handleError(reason: string) {
    this.debugService.debug('Storage Service Error: ' + reason);
  }
}
