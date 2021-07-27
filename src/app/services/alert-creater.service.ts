import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core'

@Injectable({
  providedIn: 'root'
})
export class AlertCreaterService {

  constructor(private alertController: AlertController) { }

  async alert(alertOptions:AlertOptions) {

    const alert = await this.alertController.create(alertOptions);

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
