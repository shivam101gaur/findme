import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.component.html',
  styleUrls: ['./about-app.component.scss'],
})
export class AboutAppComponent implements OnInit {



  constructor(private modalController: ModalController,) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss()
  }

  private devImageCounter: number = 1
  devImageAddress: string = '../../../../assets/dev_images/dev2.jpeg'
  changeDevImage() {

    const images = ['dev1.jpeg', 'dev2.jpeg', 'dev3.jpeg']
    this.devImageCounter++
    if (this.devImageCounter >= images.length) { this.devImageCounter = 0 }
    this.devImageAddress = '../../../../assets/dev_images/' + images[this.devImageCounter]
  }

}
