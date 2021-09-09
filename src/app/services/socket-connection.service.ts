import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";
import { apiAddress } from 'src/environments/environment';
import { Message } from '../models/world.model';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {

  private socket = io(apiAddress, { transports: ['websocket'] })


  constructor() {
    this.socket.on('disconnect', () => {
      this.socket.off("connect")
      this.socket.off("msgfromserver")
      console.log('Socket connection ended')
    });
    this.socket.on("connect", () => {
      console.log('Socket connection started')
      console.log(this.socket.connected);
    })
  }
  startConnection() {

    if (!this.socket.connected) {
      this.socket.connect()
    } else {
      console.log('Socket already connected!')
    }

  }

  endConnection() {
    this.socket.disconnect();
  }

  sendMessage(message: Message,worldId:string) {
    this.socket.emit("msgfromuser", {message,worldId: worldId})
  }

  getMessages() {
    return new Observable((observer) => {
      this.socket.on("msgfromserver", (message, user) => {
        observer.next(message)
      })
    })
  }

}
