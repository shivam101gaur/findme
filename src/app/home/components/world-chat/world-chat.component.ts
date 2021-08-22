import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { World } from 'src/app/models/world.model';
import { io } from "socket.io-client";
import { apiAddress } from 'src/environments/environment';

@Component({
  selector: 'app-world-chat',
  templateUrl: './world-chat.component.html',
  styleUrls: ['./world-chat.component.scss'],
})
export class WorldChatComponent implements OnInit {

  @Input() world: World;
  cancel() {
    this.modalController.dismiss()
  }


  constructor(private modalController: ModalController,) { }

  ngOnInit() { }

  sayhi() {

    const socket = io(apiAddress, { transports: ['websocket'] })
    socket.connect()

  }

}
