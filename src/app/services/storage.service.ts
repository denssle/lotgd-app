import {Injectable} from '@angular/core';
import {NativeStorage} from '@awesome-cordova-plugins/native-storage/ngx';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private userskey = 'USERS_KEY';

  constructor(private nativeStorage: NativeStorage) {
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
        this.nativeStorage.setItem(this.userskey, loaded);
      } else {
        this.nativeStorage.setItem(this.userskey, [user]);
      }
    });
  }

  public getUsers(): Promise<User[]> {
    return this.nativeStorage.getItem(this.userskey);
  }


}
