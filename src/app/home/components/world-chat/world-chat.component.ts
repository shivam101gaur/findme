import { Component, Input, OnInit, TrackByFunction, ViewChild } from '@angular/core';
import { color } from '@dicebear/avatars';
import { AlertController, IonContent, IonTextarea, ModalController } from '@ionic/angular';
import { utils } from 'protractor';
import { User } from 'src/app/models/user.model';
import { Message, World } from 'src/app/models/world.model';
import { AlertCreaterService } from 'src/app/services/alert-creater.service';
import { HttpUserService } from 'src/app/services/http-user.service';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { SocketConnectionService } from 'src/app/services/socket-connection.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { AddMemberComponent } from '../add-member/add-member.component';

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



  pageready: boolean;

  user: User = JSON.parse(sessionStorage.getItem('currentUser'))
  peopleMap = new Map<string, User>()

  constructor(private modalController: ModalController, public socket: SocketConnectionService, public http: HttpWorldService, public httpUser: HttpUserService, public alert: AlertCreaterService, public toaster: ToasterService) { }

  ngOnInit() {
    this.messageList = this.world.chat;
    this.getworld()
  }


  async presentaddMemebersModal() {

    const modal = await this.modalController.create({
      componentProps: {
        'world': this.world
      },
      component: AddMemberComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'md'
    });
    modal.onDidDismiss().then((res) => {
      this.getworld()
    })
    return await modal.present();
  }

  readyToLeave() {
    // console.log('leave world')
    this.alert.alert({
      header: 'Confirm Launch ?',
      message: 'Do you want to leave this World ?',
      mode: 'ios',
      buttons: [
        {
          text: 'Stay',
          role: 'cancel',
        },
        {
          text: 'Leave',
          handler: () => {
            console.log(this.world, this.user)
            this.http.removeUserFromWorld(this.world?._id, this.user?._id).subscribe(res => {
              this.toaster.toast({
                message: 'You left ' + this.world?.name
              })
              this.cancel()
              console.log('world after you left = >', res)
            }, err => {
              this.toaster.toast({
                message: ` ❌ Error in leaving the world ❌`
              })
            })
          }
        }
      ]
    })
  }



  getWorldMembers() {
    this.httpUser.getUsersInList(this.messageList.map(ele => ele.from)).subscribe(res => {
      res.map((user) => {
        this.peopleMap.set(user._id, user)
      })
      // console.log(this.peopleMap)
      this.pageready = true
      this.scrollToBottom(150)
    }, err => {
      this.alert.alert({
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
        const newMessageFromList = message.map(ele => ele.from)
        const existingMessageFromList = this.messageList.map(ele => ele.from)

        for (let index = newMessageFromList.length - 1; index >= 0; index--) {
          const newMessageFromEle = newMessageFromList[index];
          if (!existingMessageFromList.includes(newMessageFromEle)) {
            //  if there are members in new message list which were not there in existing message list
            this.messageList = message
            this.getWorldMembers()
            break;
          }

        }

        // if (message.map(ele => ele.from).filter(item => this.messageList.map(ele => ele.from).indexOf(item) < 0).length > 0) {
        //   //  if there are members in new message list which were not there in existing message list
        //   this.getWorldMembers()
        // }

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

  deleteMessage(message: Message, messageIndex: number) {
    if (messageIndex < 0 || message.from != this.user._id) return
    this.messageList.splice(messageIndex, 1)

    this.toaster.toast({
      message: 'Message Deleted !',
      duration: 3000,


      buttons: [{
        text: 'Restore',
        role: 'restore',
        handler: () => {
          this.messageList.splice(messageIndex, 0, message)
        }
      }]
    }).then(toast => {
      toast.onDidDismiss().then(t => {
        if (t.role != 'restore') {

          this.socket.deleteMessage({
            messageId: message._id,
            worldId: this.world._id
          })

          // this.http.deleteMessage(this.world._id, message._id).subscribe(res => { 
          //   // console.table(res.chat) ;
          //   this.messageList = res.chat 
          // }, err => {
          //   this.messageList.splice(messageIndex, 0, message)
          //   this.toaster.toast({
          //     message: "Could not delete Message!",
          //     color:'danger',
          //     duration:4500,
          //     buttons: [{text: 'OK',role: 'cancel' }]
          //   })
          // })
        }

      })
    })


  }
}
