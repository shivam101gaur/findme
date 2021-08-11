import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { World } from 'src/app/models/world.model';
import { AlertCreaterService } from 'src/app/services/alert-creater.service';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { CreateWorldComponent } from '../create-world/create-world.component';
import { JoinWorldComponent } from '../join-world/join-world.component';
import { UpdateWorldComponent } from '../update-world/update-world.component';
import { ViewMembersComponent } from '../view-members/view-members.component';

@Component({
  selector: 'app-manage-world',
  templateUrl: './manage-world.component.html',
  styleUrls: ['./manage-world.component.scss'],
})
export class ManageWorldComponent implements OnInit {

  worldList!: World[];
  // FIXME remove this once session storage service is added
  current_user: User = JSON.parse(sessionStorage.getItem('currentUser'))

  constructor(private httpWorld: HttpWorldService, public modalController: ModalController, public alertCreater: AlertCreaterService) { }

  ngOnInit() {
    this.getWorldListForUser();

  }

  getWorldListForUser() {
    this.httpWorld.getWorldByUserId(this.current_user._id).subscribe((res: World[]) => {
      console.log(`received world List =>`, res);
      this.worldList = res;
    })
  }

  deleteWorld(worldId: string) {

    this.alertCreater.alert({
      header: 'Are you Sure?',
      message: 'you want to delete the world',
      
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Delete',
          handler: () => {

            this.httpWorld.deleteWorld(worldId).subscribe((res) => {
              console.log(`Deleted World`, res);
              this.getWorldListForUser();
            },
              (err) => {
                console.log(`Unable to delete world =>`, err);
              })
          }
          
        }
      ]
    })

  }

  async presentCreateWorldModal() {

    const modal = await this.modalController.create({
      component: CreateWorldComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'ios'
    });
    modal.onDidDismiss().then((res) => {
      this.getWorldListForUser();
    })
    return await modal.present();
  }

  async presentEditWorldModal(world:World) {

    const modal = await this.modalController.create({
      componentProps:{
        'world':world
      },
      component: UpdateWorldComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'ios'
    });
    modal.onDidDismiss().then((res) => {
      this.getWorldListForUser();
    })
    return await modal.present();
  }

  async presentJoinWorldModal() {

    const modal = await this.modalController.create({
      component: JoinWorldComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'ios'
    });
    modal.onDidDismiss().then((res) => {
      this.getWorldListForUser();
    })
    return await modal.present();
  }

  async presentViewMembersModal(world:World) {

    const modal = await this.modalController.create({
      componentProps:{
        'world':world
      },
      component: ViewMembersComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'ios'
    });
    modal.onDidDismiss().then((res) => {
      this.getWorldListForUser();
    })
    return await modal.present();
  }

}
