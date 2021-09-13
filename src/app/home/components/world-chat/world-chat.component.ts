import { Component, Input, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { AlertController, IonContent, IonTextarea, ModalController } from '@ionic/angular';
import { utils } from 'protractor';
import { User } from 'src/app/models/user.model';
import { Message, World } from 'src/app/models/world.model';
import { HttpUserService } from 'src/app/services/http-user.service';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { SocketConnectionService } from 'src/app/services/socket-connection.service';

@Component({
  selector: 'app-world-chat',
  templateUrl: './world-chat.component.html',
  styleUrls: ['./world-chat.component.scss'],
})
export class WorldChatComponent implements OnInit {

  @ViewChild('content', { static: true }) content: IonContent;
  @ViewChild('msgInpArea', { static: true }) msgInpBox: IonTextarea;

  @Input() world: World;
  messageList: World['chat'];
  messageInput: string;
  sample: World['chat']



  pageready:boolean;

  user: User = JSON.parse(sessionStorage.getItem('currentUser'))
  peopleMap = new Map<string, User>()

  constructor(private modalController: ModalController, public socket: SocketConnectionService, public http: HttpWorldService, public httpUser: HttpUserService, public alert: AlertController) { }

  ngOnInit() {
    this.messageList = this.world.chat;
    this.getworld()


  }


  getWorldMembers() {
    this.httpUser.getUsersInList(this.world.members).subscribe(res => {
      res.map((user) => {
        this.peopleMap.set(user._id, user)
      })
      console.log(this.peopleMap)
      this.pageready=true
      this.scrollToBottom(150)
    }, err => {
      this.alert.create({
        message: 'could not fetch world members'
      })
      console.error('Could not get World Members!!')
    })
  }



  async scrollToBottom(scrollTime: number = 300) {
    this.content.scrollToBottom(scrollTime).then(() => {
      // this.msgInpBox.setFocus()
    })
  }

  trackMessages: TrackByFunction<Message> = (index: number, item: Message) => {
    return item._id;
  }

  getworld() {
    this.http.getWorldByName(this.world.name).subscribe(res => {

      this.world = res
      this.messageList = this.world.chat
      this.getWorldMembers()

      this.socket.startConnection(this.world)

      this.socket.getMessages().subscribe((message) => {
        this.messageList = message
        this.scrollToBottom()
      })
    })
  }

  ngOnDestroy(): void {
    this.socket.endConnection()
  }

  send() {

    this.socket.sendMessage({
      content: this.messageInput,
      from: JSON.parse(sessionStorage.getItem('currentUser'))._id,
      type: 'text',
    }, this.world._id)

    // clearing message input box
    this.messageInput = null
  }

  cancel() {
    this.modalController.dismiss()
  }

}
