import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { World } from 'src/app/models/world.model';
import { HttpUserService } from 'src/app/services/http-user.service';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss'],
})
export class ViewMembersComponent implements OnInit {

  @Input() world: World;

  userList: User[] = []

  constructor(private modalController: ModalController, private httpUser: HttpUserService,) { }

  ngOnInit() {
    this.getMembersOfWorld()
  }

  getMembersOfWorld() {
    this.httpUser.getUsersInList(this.world.members).subscribe(res => {

      this.userList = res;
      console.log({ res })

    }, err => {
      console.log('could not fetch members in this world')
    })
  }

  cancel() {
    this.modalController.dismiss()
  }

}
