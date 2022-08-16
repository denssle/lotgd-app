import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {LocalNotifications, ScheduleResult} from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class PopupAndToastService {

  constructor(private toastController: ToastController) {
  }

  public async openToast(header: string, message: string, duration?: number): Promise<void> {
    const toast = await this.toastController.create({
      header,
      message,
      duration: duration ?? 2000,
      position: 'top',
    });
    await toast.present();
  }

  public openNotification(header: string, message: string): void {
    LocalNotifications.schedule({
      notifications: [
        {
          title: header,
          body: message,
          id: new Date().getTime(),
        }
      ]
    }).then((scheduleResult: ScheduleResult) => {
      scheduleResult.notifications.forEach(value => console.log(value));
    }).catch(reason => {
      console.error(reason);
    });
  }
}
