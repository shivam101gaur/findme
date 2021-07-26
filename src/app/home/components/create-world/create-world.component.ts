import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { World } from 'src/app/models/world.model'
import { HttpWorldService } from 'src/app/services/http-world.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-create-world',
  templateUrl: './create-world.component.html',
  styleUrls: ['./create-world.component.scss'],
})
export class CreateWorldComponent implements OnInit {

  worldForm: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'password': new FormControl(null, [Validators.required]),
  })

  public get worldNameFormControl() {
    return this.worldForm.get('name') as FormControl;
  }
  public get worldPasswordFormControl() {
    return this.worldForm.get('password') as FormControl;
  }



  constructor(private modalController: ModalController, private httpWorld: HttpWorldService, private toasterService: ToasterService) { }

  ngOnInit() { }

  cancel() {
    this.modalController.dismiss();
  }

  onSubmit() {
    if (this.worldForm.valid) {
      this.submit();
    }
    else{
      this.toasterService.toast({
        header:'Invalid Form Input',
        message:'Take Some Time and carefully insert data'
      })
    }
  }

  submit() {
    let world: World = new World();
    world.name = this.worldNameFormControl.value;
    world.password = this.worldPasswordFormControl.value;
    try {
      world.created_by = JSON.parse(sessionStorage.getItem('currentUser'))._id;
    } catch (error) {
      this.toasterService.toast({
        header: `❌ Error in fetching Current User's ID`,
        message: `🤷‍♂️ Current User required in World created_by field`
      })
    }
    
    console.log(`world before posting`);
    console.log({ world });
    this.httpWorld.postWorld(world).subscribe((res) => {
      console.log('New World Created', res);
      this.toasterService.toast({
        header: '✅ New Word Created',
        message: `World Name : ${res.name}\nWorld ID : ${res._id}`
      });
      this.worldForm.reset();
      this.modalController.dismiss();
    }, (err) => {
      console.log('World Could not be posted', err);
      this.toasterService.toast({
        header: '❌ Word could not be created',
        message: `Error in posting the world to server`
      })
    })
  }

}
