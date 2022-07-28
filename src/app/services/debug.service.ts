import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DebugService {
  private debugMessages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() {
  }

  public debug(message: string): void {
    const list = this.debugMessages.getValue();
    list.unshift(message);
    this.debugMessages.next(list);
  }

  public observe(): Observable<string[]> {
    return this.debugMessages.asObservable();
  }

  public reset(): void {
    this.debugMessages.next([]);
  }
}
