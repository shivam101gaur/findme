import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { World } from 'src/app/models/world.model';
import { SocketConnectionService } from 'src/app/services/socket-connection.service';
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


  constructor(private modalController: ModalController,public socket:SocketConnectionService) { }

  ngOnInit() { 

    this.socket.startConnection()
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.socket.endConnection()
  }

  sayhi() {
this.socket.emitsendMessage({
  content:'Hello from angular'
})

  }

}
