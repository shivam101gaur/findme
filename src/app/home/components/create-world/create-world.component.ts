import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-world',
  templateUrl: './create-world.component.html',
  styleUrls: ['./create-world.component.scss'],
})
export class CreateWorldComponent implements OnInit {

  constructor(private modalController:ModalController) { }

  ngOnInit() {}

  cancel(){
    this.modalController.dismiss();
  }

}
