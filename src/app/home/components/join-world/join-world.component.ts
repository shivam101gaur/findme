import { Component, OnInit } from '@angular/core';
import { World } from 'src/app/models/world.model';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewMembersComponent } from '../view-members/view-members.component';

@Component({
  selector: 'app-join-world',
  templateUrl: './join-world.component.html',
  styleUrls: ['./join-world.component.scss'],
})
export class JoinWorldComponent implements OnInit {

  worldList: World[] = []

  constructor(private modalController: ModalController,private httpWorld: HttpWorldService,private toaster:ToasterService,public popoverController: PopoverController) { }

  ngOnInit() {
    this.getNewWorldsForUser()
  }

  getNewWorldsForUser() {

    try {
      var currentUserId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
    } catch (error) {
      return
    }

    this.httpWorld.getNewWorldForUserByUserId(currentUserId).subscribe((res) => {
      this.worldList = res;
    }, err => {

    })
  }

  // 📝 adding current user to a world by default
  // you can also add multiple users by passing their user id in second parameter
  joinWorld(worldId:string,membersToAdd:string[]=[]){
    try {
      var userId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
    } catch (error) {
     console.error('could not fetch userid from session storage\ncannot join the world\nreturning joinWorld');
      return
    }

    this.httpWorld.addMembersToWorld(membersToAdd.concat(userId),worldId).subscribe(res=>{
      this.toaster.toast({
        header:'🎉You joined a new World🥳',
        message:`Success`,

      });
      this.getNewWorldsForUser()
    },err=>{
      this.toaster.toast({
        header:'❌ Error in Joining the world',
        message:`Could not join the world`,
      })
    })

  }

  cancel() {
    this.modalController.dismiss();
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
      mode: 'md'
    });
    modal.onDidDismiss().then((res) => {
      // this.getNewWorldsForUser();
    })
    return await modal.present();
  }

  // async presentViewMembersPopover(world:World) {
  //   const popover = await this.popoverController.create({
  //     componentProps:{
  //       'world':world
  //     },
  //     component: ViewMembersComponent,
      
  //     // event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

}
