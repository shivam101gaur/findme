import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { io } from "socket.io-client";
import { apiAddress } from 'src/environments/environment';
import { Message, World } from '../models/world.model';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class SocketConnectionService {

  private socket = io(apiAddress, { transports: ['websocket'], autoConnect: false })


  constructor(public toaster: ToasterService) {
    this.socket.on('disconnect', () => {
      this.socket.off("connect")
      this.socket.off("msgfromserver")
      console.log('Socket connection ended')
    });
    this.socket.on("connect", () => {
      console.log('Socket connection started')
      console.log(this.socket.connected);
      this.socket.on("postMessageError",(data)=>{
        console.error('Server Error : Error in sending messages.\nMessage could not be added to world\n',data);
        this.toaster.toast({
          message: "Could not send Message!",
          color:'danger',
          duration:4500,
          buttons: [{text: 'OK',role: 'cancel' }]
        })
      })
      this.socket.on("deleteMessageError",(data)=>{
        console.error('Server Error : Error in deleting messages.\nMessage could not be deleted from the world\n',data)
        this.toaster.toast({
          message: "Could not delete Message!",
          color:'danger',
          duration:4500,
          buttons: [{text: 'OK',role: 'cancel' }]
        })
      })
    })
  }
  startConnection(world: World) {
    
    if (!this.socket.connected) {
      this.socket.io.opts.query = { "worldId": world._id, "worldName": world.name }
      this.socket.connect()
    } else {
      console.log('Socket already connected!')
    }

  }

  endConnection() {
    this.socket.disconnect();
  }

  sendMessage(message: Message, worldId: string) {
    this.socket.emit("msgfromuser", { message, worldId: worldId })
  }

  deleteMessage(dltReq:{messageId:string,worldId:string}){
    this.socket.emit("messageDeleteRequest", dltReq)
  }

  getMessages() {
    return new Observable((observer:Observer<Message[]>) => {

      this.socket.on("msgfromserver", (messages:Message[]) => {
        observer.next(messages)
      })
    })
  }

}
