import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { World } from 'src/app/models/world.model';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { CreateWorldComponent } from '../create-world/create-world.component';

@Component({
  selector: 'app-manage-world',
  templateUrl: './manage-world.component.html',
  styleUrls: ['./manage-world.component.scss'],
})
export class ManageWorldComponent implements OnInit {

  worldList!: World[];
  // FIXME remove this once session storage service is added
  current_user: User = JSON.parse(sessionStorage.getItem('currentUser'))

  constructor(private httpWorld: HttpWorldService, public modalController: ModalController) { }

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
    this.httpWorld.deleteWorld(worldId).subscribe((res) => {
      console.log(`Deleted World`, res);
      this.getWorldListForUser();
    },
      (err) => {
        console.log(`Unable to delete world =>`, err);
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
    return await modal.present();
  }

}
