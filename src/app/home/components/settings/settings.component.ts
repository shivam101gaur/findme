import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { AlertCreaterService } from 'src/app/services/alert-creater.service';
import { HttpUserService } from 'src/app/services/http-user.service';
import { MusicControllerService } from 'src/app/services/music-controller.service';
import { AboutAppComponent } from '../about-app/about-app.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  formMutated: boolean = false

  user: User = JSON.parse(sessionStorage.getItem('currentUser'))

  userNameFormControl = new FormControl(this.user.name, [Validators.required])

  userPasswordFormControl = new FormControl(this.user.password, [Validators.required])


  constructor(public musicController: MusicControllerService, private userHttp: HttpUserService,
     private alertController: AlertCreaterService,
     private router:Router
     ,private activateRoute:ActivatedRoute,public modalController: ModalController) { }

  ngOnInit() { }

  reset() {
    this.user = JSON.parse(sessionStorage.getItem('currentUser'))
    this.userNameFormControl?.setValue(this.user.name)
    this.userPasswordFormControl?.setValue(this.user.password)
    this.formMutated = false
  }

  save() {
    if (this.userNameFormControl.valid && this.userPasswordFormControl.valid) {
      let user = new User()
      
      user.name = this.userNameFormControl.value
      user.password = this.userPasswordFormControl.value
      user._id= this.user._id
  
      this.userHttp.putUser(user).subscribe(res => {
        sessionStorage.setItem("currentUser", JSON.stringify(res));
        this.reset()
      }, err => {
        if (err) {
          this.alertController.alert({ header: 'Could not update user!', message: 'Try Changing Username!' })
        
        }
      })
    }
    else {
      this.alertController.alert({ message: 'Invalid User Name or password' })
    }
  }

  checkFormMutation() {
    if (this.user.name == this.userNameFormControl.value && this.user.password == this.userPasswordFormControl.value) {
      this.formMutated = false
    }
    else {

      this.formMutated = true
    }
  }

  logout(){
    sessionStorage.removeItem('currentUser')
    this.router.navigateByUrl('authentication')
  }

  async showDeveloperInfoModal(){

    const modal = await this.modalController.create({
      component: AboutAppComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalController.getTop(),
      mode: 'ios',
      backdropDismiss:false,
    });
    modal.onDidDismiss().then((res) => {
      console.log(`Did you see the developer? 😀`)
    })
    return await modal.present();
  }

}
