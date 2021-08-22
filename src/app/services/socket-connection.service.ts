import { Injectable } from '@angular/core';
import { io } from "socket.io-client";
import { apiAddress } from 'src/environments/environment';
import { Message } from '../models/world.model';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {

  private socket = io(apiAddress, { transports: ['websocket'] })


  constructor() { }
  startConnection() {

    if (!this.socket.connected) {
      this.socket.connect()
      this.socket.on("connect", () => {
        console.log('Socket connection started')
        console.log(this.socket.connected);
        if (this.socket.connected) {
          this.listenToMessages()
        }
      })

    } else {
      console.log('Socket already connected!')
    }
  }
  endConnection() {
    this.socket.disconnect();
    if (!this.socket.connected) {
      console.log('Socket connection ended')
    }
  }

  emitsendMessage(message: Message) {
    this.socket.emit("sendMessage", message)
  }

  listenToMessages() {
    console.log('started listenting to backend')

    this.socket.on("receiveMessage", message => {
      alert('message received' + message.content)
    })
  }

}
