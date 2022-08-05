import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {
  private navMap: Map<string, string> = new Map<string, string>([
    ['showchest', 'Truhe'],
    ['house_blackboard', 'Schwarzes Brett'],
    ['house_events', 'Ereignisse'],
    ['village_show_street', 'Wohnviertel'],
    ['/village.', 'Stadt'],
    ['/house_logout.', 'Logout'],
    ['house_enter', 'Zurück ins Haus'],
  ]);

  constructor() {
  }

  public getNavLabel(url: string): string {
    for (const [key, value] of this.navMap) {
      if (url.includes(key)) {
        return value;
      }
    }
    return null;
  }
}
