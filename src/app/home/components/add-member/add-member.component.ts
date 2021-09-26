import { Component, Input, OnInit } from '@angular/core';
import { World } from 'src/app/models/world.model';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { ViewMembersComponent } from '../view-members/view-members.component';
import { AlertCreaterService } from 'src/app/services/alert-creater.service';
import { User } from 'src/app/models/user.model';
import { HttpUserService } from 'src/app/services/http-user.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {

  @Input() world: World;

  userList: User[] = []

  constructor(private modalController: ModalController, private httpWorld: HttpWorldService, private httpUser: HttpUserService, private toaster: ToasterService, private alert: AlertCreaterService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.httpUser.getAllUsers().subscribe(res => {
      this.userList = res.filter(user => {
        return !(this.world.members.includes(user._id))
      })
    })
  }


  // 📝 adding current user to a world by default
  // you can also add multiple users by passing their user id in second parameter
  joinWorld(world: World=this.world, membersToAdd: string[] = []) {

    if (world.password) {
      this.alert.alert({
        header: world.name + ' Password',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Enter Password here',
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Join',
            handler: data => {
              if (data.password == world.password) {
                try {
                  var userId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
                } catch (error) {
                  console.error('could not fetch userid from session storage\ncannot join the world\nreturning joinWorld');
                  return
                }

                this.httpWorld.addMembersToWorld(membersToAdd.concat(userId), world._id).subscribe(res => {
                  this.toaster.toast({
                    header: '🎉You joined a new World🥳',
                    message: `Success`,

                  });
                  this.cancel()
                }, err => {
                  this.toaster.toast({
                    header: '❌ Error in Joining the world',
                    message: `Could not join the world`,
                  })
                })
              }
              else {
                this.toaster.toast({
                  header: 'Wrong Password! ❌',
                  message: 'Could not join ' + world.name
                })
              }
            }
          }
        ]
      })
    } else {
      try {
        var userId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
      } catch (error) {
        console.error('could not fetch userid from session storage\ncannot join the world\nreturning joinWorld');
        return
      }

      this.httpWorld.addMembersToWorld(membersToAdd.concat(userId), world._id).subscribe(res => {
        this.toaster.toast({
          header: '🎉You joined a new World🥳',
          message: `Success`,

        });
        this.cancel()
      }, err => {
        this.toaster.toast({
          header: '❌ Error in Joining the world',
          message: `Could not join ${world.name}`,
        })
      })
    }





  }




  cancel() {
    this.modalController.dismiss();
  }


}
