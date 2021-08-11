import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { World } from 'src/app/models/world.model';
import { AlertCreaterService } from 'src/app/services/alert-creater.service';
import { HttpWorldService } from 'src/app/services/http-world.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-update-world',
  templateUrl: './update-world.component.html',
  styleUrls: ['./update-world.component.scss'],
})
export class UpdateWorldComponent implements OnInit {

  @Input() world: World;

  worldForm = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
  })



  constructor(private toasterService: ToasterService, private modalController: ModalController, private httpWorld: HttpWorldService, private alertCreater: AlertCreaterService) { }

  public get worldNameFormControl() {
    return this.worldForm.get('name') as FormControl;
  }
  public get worldPasswordFormControl() {
    return this.worldForm.get('password') as FormControl;
  }
  cancel() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.worldForm.valid) {
      this.submit();
    }
    else {
      this.toasterService.toast({
        header: 'Invalid Form Input',
        message: 'Take Some Time and carefully insert data'
      })
    }
  }

  submit() {
    if (!this.world._id) { console.log(`world Id not found\nreturning submit`); return }

    try {
      let currentUserId = JSON.parse(sessionStorage.getItem('currentUser'))._id;
      if (!(this.world.members.includes(currentUserId))) {
        // if current user is not found in world member array
        console.log(` user ID : ${currentUserId} \nwas not found in world memeber's array : ${this.world.members}`);
        this.alertCreater.alert({
          header: 'You are not allowed to edit this world',
          message: 'You are not a member of this world'
        })
        return
      }

    } catch (error) {
      this.toasterService.toast({
        header: `❌ Error in fetching Current User's ID`,
        message: `🤷‍♂️ Current User required`
      });
      return
    }

    this.world.name = this.worldNameFormControl.value;
    this.world.password = this.worldPasswordFormControl.value;



    console.log(`world before updating`);
    console.log(this.world);
    this.httpWorld.putWorld(this.world._id, this.world).subscribe((res) => {
      console.log('World Updated', res);
      this.toasterService.toast({
        header: '✅  Word Updated',
        message: `World Name : ${res.name}\nWorld ID : ${res._id}`
      });
      this.worldForm.reset();
      this.modalController.dismiss();
    }, (err) => {
      console.log('World Could not be updated', err);
      this.toasterService.toast({
        header: '❌ Word could not be updated',
        message: `Error in updating the world to server`
      })
    })
  }

  ngOnInit() {
    this.worldNameFormControl.setValue(this.world.name);
    this.worldPasswordFormControl.setValue(this.world.password)
  }

}
