import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ToastOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(public toastController: ToastController) { }

  async toast(toastOption: ToastOptions) {

    // 🤔 setting default parameters for toast
    toastOption.duration ??= 1000
    toastOption.mode = 'ios'

    const toast = await this.toastController.create(toastOption)
    toast.present();

    return toast

  }
}
