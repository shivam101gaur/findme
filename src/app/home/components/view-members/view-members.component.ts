import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { timingSafeEqual } from 'crypto';
import { User } from 'src/app/models/user.model';
import { World } from 'src/app/models/world.model';
import { HttpUserService } from 'src/app/services/http-user.service';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-view-members',
  templateUrl: './view-members.component.html',
  styleUrls: ['./view-members.component.scss'],
})
export class ViewMembersComponent implements OnInit {

  @Input() world: World;

  filterValue: string = ''
  filteredUserList: User[] = []
  selectedUsers: User['_id'][] = []

  currentUser:User = JSON.parse(sessionStorage.getItem('currentUser'))



  userList: User[] = []

  constructor(private modalController: ModalController, private httpUser: HttpUserService,private httpWorld:HttpWorldService,private toaster:ToasterService) { }

  ngOnInit() {
    this.getMembersOfWorld()
  }

  getMembersOfWorld() {
    this.httpUser.getUsersInList(this.world.members).subscribe(res => {

      this.userList = res;
      this.filteredUserList = this.userList.slice(0, 50)
      console.log({ res })

    }, err => {
      console.log('could not fetch members in this world')
    })
  }

  cancel() {
    this.modalController.dismiss()
  }

  updateWorld(){

    console.log(this.world.members)
    this.world.members = this.world.members.filter(mem=>{
     return !this.selectedUsers.includes(mem)
    })
    console.log(this.world.members)


    this.httpWorld.putWorld(this.world._id,this.world).subscribe(res=>{
      this.toaster.toast({
        header:'Members Removed from '+this.world.name,
        message:this.world.name+' Updated!'
      })
      this.world = res
      this.getMembersOfWorld()
    },
    err=>{
      this.toaster.toast({
        header:'Could not remove members from '+this.world.name,
        message:'Error in updating world'
      });
    this.cancel()
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

}
