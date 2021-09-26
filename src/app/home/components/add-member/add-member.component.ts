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

  filterValue: string = ''

  @Input() world: World;

  userList: User[] = []
  filteredUserList: User[] = []
  selectedUsers: User['_id'][] = []

  constructor(private modalController: ModalController, private httpWorld: HttpWorldService, private httpUser: HttpUserService, private toaster: ToasterService, private alert: AlertCreaterService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.httpUser.getAllUsers().subscribe(res => {
      this.userList = res.filter(user => {
        return !(this.world.members.includes(user._id))
      })
      this.filteredUserList = this.userList.slice(0, 50)
      console.log(this.userList)
      console.log(this.filteredUserList)

    })
  }

  selectMembers(e: any, userId: User['_id']) {


    if (e.currentTarget.checked) {
      if (!this.selectedUsers.includes(userId)) {
        //only push if not already included in array
        if(this.selectedUsers.length<30){
          this.selectedUsers.push(userId)
        }
        else{
          this.toaster.toast({
            header:'Selection limit exceeded',
            message:'cannot add more than 30 members at once!'
          })
          e.currentTarget.checked=!e.currentTarget.checked
        }
      }
    }
    else {
      if (this.selectedUsers.includes(userId)) {
        this.selectedUsers.splice(this.selectedUsers.indexOf(userId), 1)
      }
    }

    console.log(this.selectedUsers)
  }

  applyFilter() {
    if ((!this.filterValue.trim())) {
      // empty filter value
      this.filteredUserList = this.userList.slice(0, 50)
      return
    }

    this.filteredUserList = this.userList.filter(user => {
      return user.name?.toLowerCase().includes(this.filterValue.trim()?.toLowerCase())
    }).slice(0, 50)
  }

  // 📝 adding current user to a world by default
  // you can also add multiple users by passing their user id in second parameter
  joinWorld(world: World = this.world, membersToAdd: string[] = this.selectedUsers) {

    try {
      var userId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
    } catch (error) {
      console.error('could not fetch userid from session storage\ncannot join the world\nreturning joinWorld');
      return
    }

    this.httpWorld.addMembersToWorld(membersToAdd, world._id).subscribe(res => {
      this.selectedUsers=[]
      console.log(res)
      this.world = res
      this.getAllUsers()
      this.toaster.toast({
        header: '🎉New Members added to '+world.name+' 🥳',
        message: `Welcome Them !`,

      });
      // this.cancel()
    }, err => {
      this.toaster.toast({
        header: '❌ Error in adding new members ',
        message: `Could not add to world`,
      })
    })

  }




  cancel() {
    this.modalController.dismiss();
  }


}
